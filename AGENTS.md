# AGENTS.md

このリポジトリで作業するAIエージェント向けのメモ。応答は日本語で行う。

## 概要

- GitHub Pages向けのVanilla TypeScript SPA + 自作SSGサイト。
- React等は使っていない。HTML文字列を生成して `#root` に描画する設計。
- 実行入口は `index.html`、`works.html`、`posts/[id].html` の3系統。詳細は「HTMLエントリー」を参照。

## 主要ファイル

- `src/app.ts`: ブログSPAの共通起動処理。
- `src/route.ts`: URL状態から表示ページを決めて描画する。
- `src/reroute.ts`: `popstate`、検索フォーム、内部リンククリックを監視して再ルーティングする。
- `src/ssg.ts`: `post.template.html` と `posts.json` から `posts/*.html` を生成する。
- `src/scripts/generatePostsJson.ts`: `markdown/*.md` から `posts.json` を更新する。
- `src/scripts/generateWorks.ts`: `works.json` に文献表記を付与する。
- `src/scripts/generateSitemap.ts`: `sitemap.xml` を生成する。

## HTMLエントリー

webpackのentryは `index`、`works`、`hydrate` の3種類。

### `index.html` -> `src/index.ts`

- ブログ本体のSPAエントリー。
- `src/index.ts` は `app()` を呼ぶだけ。`app(true)` は `./posts.json` / `./about.json` を読み、初回に `route(posts)` で `#root` を描画する。

### `works.html` -> `src/works/index.ts`

- 研究業績ページ用の独立エントリー。
- `./works.json` を読み、`src/works/Works.ts` でHTMLを生成して `renderRoot()` に渡す。
- ブログSPAの `route.ts` は使わない。
- 文献表記は `src/scripts/generateWorks.ts` が `works.json` に事前生成する。

### `posts/[id].html` -> `src/hydrate.ts`

- `src/ssg.ts` が `post.template.html` から生成する静的記事HTML。
- 初期本文・canonical・OGPはHTMLに埋め込まれている。`src/hydrate.ts` は相対日付だけ更新し、`app(false)` でSPA遷移を後付けする。
- `app(false)` は `../posts.json` / `../about.json` を読むが、SSG本文を保つため初回 `route(posts)` は実行しない。

## 生成物

- `dist/*.js` と `dist/css/bundle.css` は公開対象のビルド成果物。
- `posts/*.html` はSSG成果物。
- `posts.json`、`works.json`、`sitemap.xml` も生成スクリプトで更新されることがある。
- 生成物の差分が大量に出る場合は、変更理由を確認してから扱う。無関係なら巻き戻さない。

## コマンド

`package.json` のscripts:

- `npm run dev`: 開発サーバー起動。起動時に記事・サイトマップ・文献・静的記事HTMLも生成する。
- `npm run tsc`: TypeScript型チェックのwatch。
- `npm run build`: webpackで `dist/index.js`、`dist/hydrate.js`、`dist/works.js` を生成。
- `npm run build-css`: CSSを `dist/css/bundle.css` に生成。
- `npm run lint`: TypeScriptのESLint修正。
- `npm run lint-css`: CSS lint。
- `npm run fmt`: Prettier整形。

`tsc` は `-w` 付きなので、単発確認では `npm run tsc:once` などを使う。

## Code App / iOS 環境

- iOSの[Code App](https://code.thebaselab.com/)でも開発サーバーを動かすことがある。公式ドキュメント上も、Code AppはiOSの制約を受け、ネイティブコンポーネントを含むモジュールの追加やsubprocess起動ができない。
- Code AppのNode.js v18.19.0では、`process.setUncaughtExceptionCaptureCallback()` が有効な状態で起動することがある。この環境では `domain` モジュールと共存できず、`ts-node/register` は `ERR_DOMAIN_CALLBACK_NOT_AVAILABLE` で落ちる。サーバー側TSの読み込みには `jiti` を使う。
- Code AppのNode環境では `WebAssembly` が未定義になることがある。webpackの既定 `md4` ハッシュ経路は `webpack/lib/util/hash/md4.js` に入り `ReferenceError: WebAssembly is not defined` になるため、`webpack.config.mjs` の `output.hashFunction: 'sha256'` を外さない。
- Node 18 / OpenSSL 3 では古いwebpackの `md4` ハッシュが `digital envelope routines` / `ERR_OSSL_EVP_UNSUPPORTED` で落ちる。webpack系依存を古い版へ戻す場合はCode Appで `npm run dev` を再検証する。
- Code Appでは、Nodeの `child_process.spawn()` から子プロセスを作る処理が `spawn EPERM` / `Operation not permitted` で落ちることがある。内蔵ターミナルがコマンドを起動できても、その中のNodeプロセスからさらに別プロセスを起動できるとは限らない。Code Appで動かすツールは、外部CLIや複数コマンドを内部から起動しない構成を優先する。

## 実装上の注意

- ルーティング変更では、`route.ts` と `reroute.ts` の責務を分ける。
  - `route.ts`: 現在URLから何を描画するか。
  - `reroute.ts`: 何をきっかけに再描画するか。
- 内部リンクのSPA遷移は `document` のクリック監視で拾う。`#root` は描画ごとに差し替わるため、個別リンクへ毎回イベントを貼る設計に戻さない。
- HTMLごとに基準ディレクトリが違う。JSON、JS、CSSの相対パスに注意する。
- canonical、OGP、descriptionなどのhead要素は、SSGとSPAの両方で破綻しないようにする。
- `src/ssg.ts` はサーバーサイド専用。クライアント専用APIに依存するコードをimportしない。
- 予約投稿は本番相当では `excludeReserved` で除外される。開発時はlocalhost判定で表示される。
- `blog-card` はCustom Element。SSGではカードHTMLを事前埋め込みし、SPAでは `defineBlogCard` が定義する。

## 編集方針

- 既存のHTML文字列コンポーネントの書き方に合わせる。
- 余計なフレームワークや大きな依存を追加しない。
- 手作業で生成物を直すより、可能なら生成元を直す。
- むやみに関数や変数に切り出すよりもインラインで書くほうを優先する。
- ワンライナー寄りの簡潔なコードスタイルを採用する。
- 関数型プログラミングのスタイルを採用する。変数の再代入は避け、ループよりも非破壊的な配列操作を優先する。

## コードレビューの基本方針

- ベストプラクティスの具体例を提示してください
- 学習リソースの提案を積極的に行ってください
- 以下のプレフィックスを使用してレビューコメントを分類してください：
  - `[must]`：必須修正項目（セキュリティ、バグ、重大な設計問題）
  - `[recommend]`：推奨修正項目（パフォーマンス、可読性の大幅改善）
  - `[nits]`：軽微な指摘（コードスタイル、タイポ等）
