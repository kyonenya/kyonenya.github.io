# トップページのSSG 実装プラン

## 目的

Googleが記事のURLを見つけられるように、トップページ（`/`）の記事一覧を静的HTMLに出す。

Search Consoleでは、サイトマップの最終読み込みが2024/10/19で止まっていて、41記事のうちGoogleが `/posts/N` を把握しているのは11件だけだった。トップページは定期的にクロールされている（最終 2026/09/14）ので、静的HTMLに `<a href="/posts/N">` があれば、サイトマップに頼らなくても全記事を見つけてもらえる。

## 決めたこと

| 論点 | 決定 |
|---|---|
| 予約投稿 | 静的HTMLには公開済みの記事だけを出す。静的な件数と今の公開件数が違うときだけ、JSで一覧を描き直す |
| 生成方式 | 今の `index.html` を `index.template.html` に移す。`index.html` は生成物にする（`post.template.html` と同じ方式） |
| `/?tag=` や検索で開いたときのチラつき | 許容する |
| 予約投稿の個別ページとサイトマップ | 今回は変えない |
| 静的なcanonical | 入れない。`index.html` は `/?tag=` や `/?id=` も配信しているので、静的に `/` を書くと、JSで差し込むcanonicalと食い違う |
| 一覧の「◯年前」 | 記事ページと同じく、静的HTMLには絶対日付を出し、`data-date` を見てJSで相対表示に置き換える |

## 変更内容

### 1. テンプレートを分離する

- `git mv index.html index.template.html`
- `#root` の中を `{{PAGE_BODY}}` にする

```html
<div id="root">
  {{PAGE_BODY}}
</div><!-- ./root -->
```

### 2. SSGでトップページを生成する（`src/ssg.ts`）

`generateStaticHtml` で `index.html` も書き出す。`npm run dev` の起動時と `ssg.ts` の単体実行の両方で、今と同じ流れで生成される。

```ts
const indexTemplatePath = path.resolve(rootDir, 'index.template.html');

// generateStaticHtml 内
const [template, indexTemplate] = await Promise.all([
  readFile(templatePath, 'utf8'),
  readFile(indexTemplatePath, 'utf8'),
]);
await Promise.all([
  writeFile(
    path.resolve(rootDir, 'index.html'),
    indexTemplate.replace('{{PAGE_BODY}}', () =>
      PostList(excludeReserved(posts), true),
    ),
    'utf8',
  ),
  ...posts.map(/* 既存の posts/N.html 生成 */),
]);
```

- 置換は関数で渡す。本文に `$&` などが含まれていても、置換パターンとして解釈されないようにするため。
- `excludeReserved` はビルドした時点の時刻で判定する。

### 3. 一覧にSSG用の日付表示を足す（`src/PostList.ts`, `src/PostListItem.ts`）

- `PostList(posts, ssg?)` で、`ssg` を `PostListItem` に渡す。
- `PostListItem` のフッターの日付を、`Article.ts` と同じ形にする。

```ts
<span class="bl_postList_dateago" data-date="${post.createdAt.toISOString()}">
  ${ssg ? formatYMD(post.createdAt) : fromNow(post.createdAt)}
</span>
```

### 4. 相対日付の置き換えを共通化する（`src/hydrate.ts`, `src/app.ts`）

- `hydrateFromNow` を `hydrate.ts` から `app.ts` に移し、`app()` の冒頭で呼ぶ。トップページと記事ページの両方で動く。
- セレクタを `.bl_posts_dateago` から `[data-date]` に変える。
- `hydrate.ts` は `void app(false)` だけになる。

### 5. 初回表示で描き直すかどうかを判定する（`src/app.ts`, `src/route.ts`, `src/render.ts`）

- `app.ts`: 初回だけ `route(posts, true)` を呼ぶ。`registerRerouter` から呼ぶときは今のまま。
- `route.ts`: トップページの分岐で、静的な一覧の件数と、表示すべき件数を比べる。

```ts
export function route(rawPosts: Post[], isInitial = false): void {
  // ...
  } else {
    routeMap.postList(
      posts,
      isInitial &&
        document.querySelectorAll('.bl_postList_item').length === posts.length,
    );
  }
}
```

- `routeMap.postList(posts, isHydration = false)` は、`renderPage(page, isHydration)` を呼ぶ。
- `render.ts`: `renderPage(page, isHydration = false)` は、`isHydration` のときに `renderRoot` を飛ばす。titleとcanonicalの設定はそのまま行う。`renderRoot` の `scrollTo(0, 0)` も走らないので、読み込み中にスクロールしても先頭に戻されない。

描き直しが起きるのは次の場合。

- ビルド後に、公開時刻を過ぎた予約投稿がある（本番）
- 開発環境で予約投稿がある（`isDevelopment` のときは全件を出すため。今までどおり予約投稿が見える）
- `/?tag=`、`#キーワード`、`/?id=N` で開いたとき（件数の比較より前の分岐で、今までどおり描画される）

### 6. ドキュメント

- `AGENTS.md`: `index.html` と `posts/*.html` は生成物で、手で編集するのは `index.template.html` と `post.template.html` だと書き足す。
- `README.md`: SSGの説明（32行目付近）に、トップページも静的生成していることを足す。

## 動作確認

1. `npm run tsc:once` と `npm run lint` が通る。
2. `npm run dev` で `index.html` が生成され、`bl_postList_item` が41件、`href="/posts/N"` が41本ある（Node側での試算では約67KB）。
3. `npm run build` で `dist/index.js` と `dist/hydrate.js` が更新される。
4. `localhost:3100` をブラウザで開いて確かめる。
   - `/` で一覧がすぐ表示され、JSの読み込み後も描き直されない。読み込み中にスクロールしても先頭に戻らない。
   - 「◯年前」が相対表示に置き換わり、`<head>` にcanonical（`https://kyonenya.github.io/`）が入る。
   - 記事への遷移とブラウザの戻る、`/?tag=音楽`、`/#キーワード`、`/?id=27` が今までどおり動く。
   - 生成された `index.html` から `<li>` を1件消してリロードすると、41件で描き直される（予約投稿が公開されたときの経路の確認）。
   - `/posts/N` で「◯年前」が今までどおり表示される。

## デプロイ後

1. Search ConsoleのURL検査で `https://kyonenya.github.io/` の「公開 URL をテスト」を実行し、取得したHTMLに記事へのリンクが入っていることを確かめる。
2. `/` だけ「インデックス登録をリクエスト」する。トップが再クロールされれば、そこから全記事へのリンクが見つかる。
3. 1〜3週間後、「ページのインデックス登録」で `/posts/N` の件数を見る。URL検査で `/posts/1` の「参照元ページ」に `https://kyonenya.github.io/` が出ていれば、トップページ経由で発見されている。

## 既知の小さな差異

- 開発環境では今、`renderRoot` がヘッダーの絶対URLのリンクを `localhost` 向けに書き換えている。描き直しを飛ばすとこの書き換えも走らないので、Works・Aboutのリンクが本番に飛ぶ。`posts/N.html` では今も同じ挙動なので、今回は直さない。

## 今回の範囲外

- タグページのSSG
- 予約投稿を個別ページとサイトマップから除外すること
- `?id=` のリダイレクトを戻すかどうか
