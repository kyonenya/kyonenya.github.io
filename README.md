**[https://kyonenya.github.io/](https://kyonenya.github.io/)**

## これはどんなサイトですか

静的なHTMLホスティングサイトでも動作するように、JavaScriptのみで構築したサーバーレスなブログサイト。フレームワークを使わず、Vanilla JS（TypeScript）で実装している。

## 機能一覧

### 簡易CMS機能

- 記事データベースはjsonで代用。非同期通信（fetch）でjsonをGETする。
- 個別記事ページはパーマリンクをクエリ文字列（?id=123）で割り振り、そのidをもとに個別ページを生成する。
- 記事はマークダウンではなくHTMLで書いている。（parserが不要なので楽だし、一昔前のブログサイトみたいでレトロなので。）

### 全文検索機能

- 検索語句を入力するたびごとにイベントが発生し、それをトリガーに検索実行。即座に検索結果に反映される。
- 単方向データフロー：以前は一度レンダリングした記事一覧のDOMを後から書き換えて検索結果を表示していた。リファクタして、検索されるたびごとに記事一覧のHTMLを再生成して再描画させるようにした。Reactと同じで、いったん描画されたものは弄らず、流し込んだデータのみに応じてビューが一通りに定まる。[PR #6：単方向データフローでの全文検索](https://github.com/kyonenya/kyonenya.github.io/pull/6)
- タグによるフィルター機能：ハッシュタグをクリックすると、クエリ文字列（/?tag="foo"）をもとに当該タグを持つ記事だけを表示される。タグフィルターをかけた状態でさらに全文検索をすることもできる（これがけっこう難しかった）。

### 爆速ページ遷移

- 記事一覧ページをクリックして個別記事ページに飛ぶとき、ロードがまったく発生せず、一瞬で遷移する。
- History API：aタグのページ遷移とロードを無効化し、JSのみでページの再描画を行う。ブラウザの戻る・進むなどの履歴もJSから作成している。[PR #7：History APIを用いたスムーズなページ遷移](https://github.com/kyonenya/kyonenya.github.io/pull/7)
- 通常のブログサイトでは、記事一覧ページでは記事を全件取得するAPIを、個別記事ページに飛んだときは記事を一件取得するAPIをそれぞれ叩く。しかし当サイトでは記事を全件表示した時点でユーザーはすでに全記事データを取得済みである。それを使って個別記事ページも生成するので、遷移時にサーバーとの通信が発生せず、ゆえに爆速。
  - これは当サイトがテキストサイトであり、記事データがきわめて軽量だという特性を利用したもの。たとえ記事を100件書いても300KB（画像1枚）程度だと見込まれる。

### ブログカード

- 記事内から別記事にリンクするとき用の、記事タイトルと本文の一部が記されたブログパーツ。ブラウザ標準の[Web Components](https://developer.mozilla.org/ja/docs/Web/Web_Components)で実装した。

## リファクタリング（2020/11）

- 全面的にリファクタリングしたので、変更点を書く。
- webpackを導入し、コードをモジュールに分割（以前は単一のjsファイルに上から順に命令型のコードを書いていた……）。同じくCSSもモジュールに分割し、こちらはpostcssでminifyしつつバンドルしている。
- TypeScriptを導入。最初はanyを使いつつ徐々に型付けしていき、最終的にはstrictモードでコンパイルが通るようになった。型の支援のおかげで開発速度はむしろ早くなったと思う。
- eslintでの構文チェック、prettierでのコード整形。
- 他、[リファクタリング（第二版）](https://www.amazon.co.jp/dp/4274224546/)を参考にリファクタ。クラスを削除して関数にする、不要なコメントを削除してコードに語らせる、ループの分割とmapへの置き換え、変数のインライン化、等々。
- ちなみに、iPadでnode.jsが動く[play.js](https://playdotjs.com)というアプリで主に開発している。
- ほか[PR #5](https://github.com/kyonenya/kyonenya.github.io/pull/5)や[旧版README](https://github.com/kyonenya/kyonenya.github.io/tree/a6491416e7e7991cfef8fc4b65a5210d06ce7643)を参照。

## なぜそんな設計で作るのですか（2020/4）

- なぜ静的ホスティングサイトなのですか——有料サーバーと契約すると、自分が死んだりクレジットカードが止まったりしただけでサイトが消滅するから（無料サーバーも3ヶ月ごとなどの更新ボタンを押し忘れると消える）。
- なぜGitHub Pagesなのですか——今後数十年は潰れそうにない会社だから。あと無料ドメイン（github.io）が一番かっこいいから。
- なぜHTMLサイトにしないのですか——記事を100個作るためにディレクトリにHTMLファイルを100個作るのは合理的でないから。その場合、例えばヘッダーとフッターのデザインを変えるとき、100個のHTMLファイル全てを手動で更新することになる。
- それならなぜ静的サイトジェネレーター（Jekyll等）を使わないのですか——スマホやタブレットから記事を追加したりスタイルを調整したりできないため。たかがブログを書くのにパソコンを開いていちいちビルドするのはスマートでない。
- 結論——静的なホスティングサイトで、かつ動的なページ生成を可能にするには、相手方のPCやスマホを使役してページ生成をやらせるのがよい（本来サーバーサイドでやるべき仕事を相手にやらせる横着な方法）。
- （以上はサイト作成当初（2020年4月）に書いた文章。何も分からないので自力で設計を考えたのだが、今読むとこれはSPA（シングルページアプリケーション）の再発明であったことが分かる。それにしても当時は本当に何も分からなくて、記事データをcsvで持とうとしたり、fc2サイトでホスティングしたりしようとしていた。）

## サイトデザイン

- テキストメインのサイトのデザインはシンプルゆえに苦労した。画像、塗りつぶし、大きな文字を極力使わず、モノクロ色の濃淡で強弱をつけていくようにした。
  - 個人的に、[andante](http://ofni.necocen.info)という日記サイトのデザインを勝手に参考にさせてもらった。ロゴの横に記事idが表示されるところがとくに好き。
- レスポンシブ対応、ダークモード対応。
- サイトアイコンはSVGで描画している。引用符のアイコンに色をつけたもの。
- CSSの命名規則は[PRECSS](http://precss.io/ja/) に則る。参考書籍：『CSS設計完全ガイド』（[Amazon](https://www.amazon.co.jp/dp/429711173X)）

## Licencing

- `locales-ja-JP.xml` in this repository is under the [CC BY-SA 3.0 Unported licence](https://creativecommons.org/licenses/by-sa/3.0/deed.ja) ©︎ [CitationStyles.org](https://citationstyles.org/)
  - [citation-style-language/locales: Official repository for Citation Style Language (CSL) locale files.](https://github.com/citation-style-language/locales)
- `sist02modified.csl` in this repository is under the [CC BY-SA 3.0 Unported licence](https://creativecommons.org/licenses/by-sa/3.0/deed.ja)
  - This files is modified. Original: [sist02 – Zotero Style Repository](http://www.zotero.org/styles/sist02)
