## これはどんなサイトですか
静的なHTMLサイトでも動作するように、JavaScriptのみで構築したブログサイト。記事データをJSONファイルで保持し、そこから個別記事ページを動的に生成する。


## なぜそんな設計で作るのですか
- なぜ静的ホスティングサイトなのですか——有料サーバーと契約すると、自分が死んだりクレジットカードが止まったりしただけでサイトが消滅するから（無料サーバーも3ヶ月ごとなどの更新ボタンを押し忘れると消える）。

- なぜGitHub Pagesなのですか——今後数十年は潰れそうにない会社だから。あと無料ドメイン（github.io）が一番かっこいいから。

- なぜHTMLサイトにしないのですか——記事を100個作るためにディレクトリにHTMLファイルを100個作るのは合理的でないから。その場合、例えばヘッダーとフッターのデザインを変えるとき、100個のHTMLファイル全てを手動で更新することになる。

- それならなぜ静的サイトジェネレーター（Jekyll等）を使わないのですか——スマホやタブレットから記事を追加したりスタイルを調整したりできないため。たかがブログを書くのにパソコンを開いていちいちビルドするのはスマートでない。

- 結論——静的なホスティングサイトで、かつ動的なページ生成を可能にするには、相手方のPCやスマホを使役してページ生成をやらせるのがよい（本来サーバーサイドでやるべき仕事を相手にやらせる横着な方法）。


## 簡易CMS機能
- 記事データベース：jsonファイルで代用。非同期通信（ajax）でjsonをGETして、オブジェクトに格納する。以前はjQueryの$getJSONでやっていたが、現在はJavaScriptネイティブのfetchで行なっている。参考：[JSONファイルからHTML生成（jQuery）](https://teratail.com/questions/93120)

- 記事一覧ページ：テンプレートに記事データを埋め込んで、ループで一括HTML生成。参考：[JavaScriptのDOM要素一括生成の速度比較（.innerHTML系が一番速い）](http://bicycle.life.coocan.jp/takamints/index.php/techtips/whichFastAppendChild)

- 個別記事ページ：パーマリンクをクエリ文字列（?id=123）で割り振り、そのidをもとに個別ページを生成。ページ遷移しているように見える。


## 全文検索機能
- メニューバーの虫眼鏡アイコンを押すと検索ボックスが出現する。実はCSSのみで作れる。参考：[ボタンを押すと出現する検索フォーム](http://millkeyweb.com/switched-search-form/)

- 検索語句を入力するたびごとにイベントが発生し、それをトリガーに検索実行。即座に検索結果に反映される。参考：[リアルタイム検索（jQuery）](https://www.tam-tam.co.jp/tipsnote/javascript/post11315.html)

- これに限らず、jQueryで作ったものはJavaScriptに置き換えた。IEへの対応と引き換えに、サイトのメンテナンスの労力を削減するため。参考：[jQuery→JavaScript書き換え一覧](https://qiita.com/okame_qiita/items/d8d85906b88e33ba0eff)


## 今後実装予定の機能
- タグによるフィルター機能：クエリ文字列（/?tag="hoge"）をもとに当該タグを持つ記事だけを表示する。

- 関連記事のサジェスト：個別記事ページの末尾に、似た内容の記事を数件おすすめする。

## サイトデザインについて
- CSSの命名規則は[PRECSS](http://precss.io/ja/) に則る。参考書籍：『CSS設計完全ガイド』（[Amazon](https://www.amazon.co.jp/dp/429711173X)）

- 記事ページではマークダウンのように、HTMLタグへのマークアップがただちに装飾に反映される（例：`<em>強調</em>`→**強調**）。ただし、これは「文章構造とレイアウトの分離（HTMLとCSSの分離）」という原則に反するため、特定のdiv領域（bl_textクラス）に限定して、そこでだけ直接的なマークアップをしている。

- [andante](http://ofni.necocen.info)という日記サイトのデザインを勝手に大いに参考にさせてもらった。


## JavaScript SEO
- 現在ではGoogleクローラーはJavaScriptをほぼ完全にレンダリングできる。JavaScriptで動的に生成したページも、サイトマップをxmlで作ってサーチコンソールから送信すれば登録してくれる。参考：[拝啓 Google様、JavaScriptとJSONで動的に変化するページをインデックスしてください](https://qiita.com/S_Kosaka/items/ab6465141061e08bce64)

- ただし厄介ごともある。具体的には、Googlebotが持ってるJavaScriptのキャッシュが悪さをする。次のような症状がこのサイトでも出た。例：[ライブテストとクロール済みのページで得られるHTMLが異なっている](https://developers.google.com/search/docs/guides/fix-search-javascript?hl=ja)

- - この場合、ファイル名にフィンガープリントを設定することで解決する（[Google公式マニュアル](https://developers.google.com/search/docs/guides/fix-search-javascript?hl=ja)）。記事のjsonを更新したら（jsonファイルではなく）jsファイルに"script-20200530"のようなユニークな名前をつける。原始的なやり方だが、更新を確実に反映させたいときの応急処置として。参考：[「キャッシュのせいだから再読込して」と毎回言わなくて済むように](https://www.nishishi.com/blog/2013/04/avoid_cache_que.html)