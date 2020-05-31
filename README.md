## これはどんなサイトですか
静的なHTMLサイトでも動作するように、JavaScriptのみで構築したブログサイト。記事データをJSONファイルで保持し、そこから個別記事ページを動的に生成する。リアルタイムで全文検索をできる機能もある。SEO面、検索エンジン（Google）への反映についても検証済。


## なぜそんな設計で作る必要があるのですか
- なぜ静的ホスティングサイトなのですか——有料サーバーと契約すると、自分が死んだりクレカが止まったりしただけでサイトが消滅するから。無料サーバーも3ヶ月ごとなどの更新ボタンを押し忘れると消える。

- なぜGitHub Pagesなのですか——今後数十年は潰れそうにない会社だから。あと無料ドメイン名（github.io）が一番かっこいいから。

- なぜHTMLサイトにはしないのですか——記事を100個作ったらディレクトリにHTMLファイルが100個できるのが嫌だから。ヘッダーとフッターのデザインを変えるとき100個のHTMLファイル全てを更新するのは不合理だから。

- 結論——静的なホスティングサイトで、かつ動的なページ生成を可能にするためには、相手方のPCやスマホを使役してページ生成をやらせればよい（本来サーバーサイドでやるべき仕事を相手にやらせる横着な方法）。


## 簡易CMS機能
- 記事データベース：jsonファイルで代用。非同期通信（ajax）でjsonをGETして、オブジェクトに格納する。以前はjQueryの$getJSONでやっていたが、現在はJavaScriptネイティブのfetchで行なっている。参考：[JSONファイルからHTML生成（jQuery）](https://teratail.com/questions/93120)

- 記事一覧ページ：テンプレートに記事データを埋め込んで、ループで一括HTML生成。参考：[JavaScriptのDOM要素一括生成は.innerHTMLが速い](http://bicycle.life.coocan.jp/takamints/index.php/techtips/whichFastAppendChild)

- 個別記事ページ：パーマリンクをクエリ文字列（?id=123）で割り振り、そのidをもとに個別ページを生成。ページ遷移しているように見える。


## 全文検索機能
- メニューバーの虫眼鏡アイコンを押すと検索ボックスが出現する。実はCSSのみで作れる。参考：[ボタンを押すと出現する検索フォーム](http://millkeyweb.com/switched-search-form/)

- 検索語句を入力するたびごとにイベントが発生し、それをトリガーに検索実行。即座に検索結果に反映される。参考：[リアルタイム検索（jQuery）](https://www.tam-tam.co.jp/tipsnote/javascript/post11315.html)

- これに限らず、脱jQueryの潮流に従って、jQueryをJavaScriptに置き換えた。参考：[jQuery→JavaScript書き換え一覧](https://qiita.com/okame_qiita/items/d8d85906b88e33ba0eff)


## JavaScript SEO
- 現在ではGoogleクローラーがJavaScriptをレンダリングできるというのは常識だが、厄介ごとも多い。

- 原則的には、サイトマップをxmlで作ってサーチコンソールから送信すれば登録してくれる。参考：[拝啓 Google様、JavaScriptとJSONで動的に変化するページをインデックスしてください](https://qiita.com/S_Kosaka/items/ab6465141061e08bce64)

<!-- - 例えば、検索結果への反映やサーチコンソールからの削除申請に対する反応は現在でもゆっくりめ。参考：[HTMLのクロールとJavaScriptの実行は別プロセス](https://www.suzukikenichi.com/blog/executing-javascript-needs-another-cycle-and-takes-longer-time/) -->

- Googlebotが持ってるJavaScriptのキャッシュが悪さをする。次のような症状がこのサイトでも出た。例：[ライブテストとクロール済みのページで得られるHTMLが異なっている](https://developers.google.com/search/docs/guides/fix-search-javascript?hl=ja)

- この場合、ファイル名にフィンガープリントを設定することで解決する（[Google公式マニュアル](https://developers.google.com/search/docs/guides/fix-search-javascript?hl=ja)）。記事のjsonを更新したら（jsonファイルではなく）jsファイルに"script-20200530"のようなユニークな名前をつける。原始的なやり方だが、更新を確実に反映させたいときの応急処置として。参考：[キャッシュのせいだから再読込して」と毎回言わなくて済むように](https://www.nishishi.com/blog/2013/04/avoid_cache_que.html)


## サイトデザインについて
- CSSの命名規則は [PRECSS](http://precss.io/ja/) に則る。参考書籍：『CSS設計完全ガイド』（[Amazon](https://www.amazon.co.jp/dp/429711173X)）

- [andante](http://ofni.necocen.info)という日記サイトのデザインを勝手に大いに参考にさせてもらった。
