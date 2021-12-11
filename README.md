**[https://kyonenya.github.io/](https://kyonenya.github.io/)**

## これはどんなサイトですか

静的なHTMLホスティングサイトでも動作するように、JavaScriptのみで構築したサーバーレスなブログサイト。フレームワークを使わず、Vanilla JS（TypeScript）で実装している。

## 機能

- CMS機能
  - 記事データベースはJSONで代用
  - 個別記事ページはパーマリンクをクエリ文字列（`?id=123`）で割り振り、そのidをもとに個別ページをJSで生成
- 全文検索
  - 記事データをすべて取得してクライアントサイドで検索実行
  - 検索結果生成には自作パッケージ [search-summary](https://www.npmjs.com/package/search-summary) を使用
- 記事タグによる絞り込み
- ダークモード対応・レスポンシブ対応
- 関連記事表示用のブログカード
  - ネイティブの [Custom elements](https://developer.mozilla.org/ja/docs/Web/Web_Components/Using_custom_elements) で実装
- スムーズなページ遷移（[v1.2.0](https://github.com/kyonenya/kyonenya.github.io/releases/tag/v1.2.0) より）
  - aタグのページ再読み込みを無効化し、JSのみでページを再描画
  - ブラウザの履歴は [History API](https://developer.mozilla.org/ja/docs/Web/API/History_API) で作成
- 更新通知バッジ（[v2.1.0](https://github.com/kyonenya/kyonenya.github.io/releases/tag/v2.1.0) より）
  - お知らせがあるとナビメニューにバッジが表示され、クリックすると消える
  - クリックしたかどうかの履歴は読み手のブラウザの [LocalStorage](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage) に保存
- 記事の印刷レイアウトの最適化（[v2.1.3](https://github.com/kyonenya/kyonenya.github.io/releases/tag/v2.1.3) より）
- Worksページの業績リストの自動生成（[v2.2.0](https://github.com/kyonenya/kyonenya.github.io/releases/tag/v2.2.0) より）
  - 業績データは [CSL-JSON](https://docs.citationstyles.org/en/stable/specification.html#appendix-iv-variables) 形式で保持
  - 書式は [CSL (Citation Style Language)](https://docs.citationstyles.org/en/stable/specification.html#appendix-iv-variables) ファイルで調整し、文献リストは [citeproc-js](https://github.com/Juris-M/citeproc-js) で事前生成しておく
  - 試行錯誤の履歴：[kyonenya/citation-js-playground](https://github.com/kyonenya/citation-js-playground)

## 技術

- Vanilla JS
  - ノーフレームワークでSPAを作り、ブラウザ標準のAPIへの理解を深める
  - コンポーネント設計や単方向データフローはReactを踏襲
  - TODO: [Web Components](https://developer.mozilla.org/ja/docs/Web/Web_Components) (とくに [shadow DOM](https://developer.mozilla.org/ja/docs/Web/Web_Components/Using_shadow_DOM)) の活用をさらに進める
- Webpack・PostCSS（[v1.1.0](https://github.com/kyonenya/kyonenya.github.io/releases/tag/v1.1.0) より）
- TypeScript（[v2.0.0](https://github.com/kyonenya/kyonenya.github.io/releases/tag/v2.0.0) より）
- [play.js](https://playdotjs.com) というiPadでNode.jsが動かせるアプリで主に開発している

## なぜそんな設計で作るのですか（v0.0.0, 2020年4月）

- なぜ静的ホスティングサイトなのですか
  - 有料サーバーと契約すると、自分が死んだりクレジットカードが止まったりしただけでサイトが消滅するから（無料サーバーも3ヶ月ごとなどの更新ボタンを押し忘れると消える）
- なぜGitHub Pagesなのですか
  - 今後数十年は潰れそうにない会社だから
  - 無料ドメイン（`github.io`）が一番かっこいいから
- なぜHTMLサイトにしないのですか
  - 記事を100個作るためにディレクトリにHTMLファイルを100個作るのは合理的でないから
    - その場合、例えばヘッダーとフッターのデザインを変えるとき、100個のHTMLファイル全てを手動で更新することになる
- それならなぜ静的サイトジェネレーター（Jekyll等）を使わないのですか
  - スマホやタブレットから記事を追加したりスタイルを調整したりできないため
    - たかがブログを書くのにパソコンを開いていちいちビルドするのはスマートでない
- 結論
  - 静的なホスティングサイトで、かつ動的なページ生成を可能にするには、相手方のPCやスマホを使役してページ生成をやらせるのがよい（本来サーバーサイドでやるべき仕事を相手にやらせる横着な方法）

（以上はサイト作成当初（2020年4月）に書いた文章。何も分からないので自力で設計を考えたのだが、今読むとこれはSPA（シングルページアプリケーション）の再発明であったことが分かる。それにしても当時は本当に何も分からなくて、記事データをcsvで持とうとしたり、FC2サイトでホスティングしたりしようとしていた。ほか、旧版の [README (v2.0.0)](https://github.com/kyonenya/kyonenya.github.io/blob/v2.0.0/README.md) なども参照）
