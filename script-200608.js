'use strict'
{	
	// 表示調整用
	const jsonPath = 'data-200608.json';

	// その他変数宣言
	let html = [];

	/* ---------------------------------
		URLからクエリ文字列を取得 */
	const getUrlQueries = () => {
		const queries = {};
		const queryStr = window.location.search.slice(1);	// 'foo=1&bar=2'、文頭の'?'を除外
	
	  // クエリがない場合は、
		if (!queryStr) {
			return queries;	// 空のオブジェクトを返す。
		}
		
	  // 複数のクエリを'&'で切って配列へと分解
		const queryArr = queryStr.split('&')	// ['foo=1', 'bar=2']
	
		queryArr.forEach((eachQueryStr) => {
			// '='でさらに分割してそれぞれ配列（key,value）へと格納
			const keyAndValue = eachQueryStr.split('=');	// ['foo', '1']
			// 配列からオブジェクトを生成、このとき値を日本語にデコードしておく
			queries[keyAndValue[0]] = decodeURIComponent(keyAndValue[1]);	// {foo: 1}
		});
	
		return queries;
	};
	
	// 実行
	const queries = getUrlQueries();


/* JSONデータ取得開始 --------------------  */
fetch(jsonPath)
 .then((response) => response.json())
 .then((data) => {

	// 古い順に逆順ソート
/*	data.sort(function(a, b) {
		if (a.date > b.date) {
			return 1;
		} else {
			return -1;
		}
	}) */


	/* ---------------------------------
		下準備・テンプレートの加工 */
	for (var i = 0; i < data.length; i=i+1) {

	// dataオブジェクト配列にプロパティを追加
		// 1. ダブルダッシュ——が途切れてしまうので罫線に変更
		data[i].text = data[i].text.replace(/——/g, '──');
		data[i].title = data[i].title.replace(/——/g, '──');

		// 2. プレーンテキストを生成して格納
		data[i].plainText = data[i].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');

		// 3. 記事一覧リストでの表示用文字列を作る
		const postTextLength = 125;	// 記事一覧に何文字表示するか
		
		// 長文なら、
		if (data[i].plainText.length > postTextLength) {
			data[i].postText = `${data[i].plainText.substr(0, postTextLength)}…`;	// 冒頭n文字分だけを省略表示。
		} else {	// 短文なら、
			data[i].postText = data[i].plainText;	// プレーンテキストそのまま
		};

		// dataオブジェクト配列に新しいプロパティを追加）
		data[i].hashtags = data[i].tags
				.map((eachTag) => template_hashtags(eachTag))
				.join('');
	
	// 記事一覧ページのHTMLタグを積算 ----------
		const tagFilterIndex = data[i].tags.indexOf(queries.tag)

		// タグ検索がONで、かつ検索にマッチしないならば、
		if (queries.tag != null & tagFilterIndex == -1) {
			// 当該記事はフィルターされ、生成されない。
		}
		// もしタイトルが存在すれば、
		else if (data[i].title) {	
			html.push(html_postlist(i));	// そのまま積算。
		} 
		// タイトルが存在しなければ、
		else {
			// タイトルタグ（h2）を削除してから積算。
			html.push(html_postlist(i).replace(/<h2[\s\S]*?h2>/gm, ''));	// [改行文字or非改行文字]の最短の(?)繰り返し(*)
		}
	
	}	// for() {...


	/* ---------------------------------
		リアルタイム検索 */
	
	/* 検索関数 ---------- */
	const realTimeSearch = () => {

		// 検索ボックスに入力された値
		const searchWord = document.querySelector('.el_search_form').value;
		
		// 全件ループ開始
		for (var i = 0; i < data.length; i=i+1) {
			const li = document.querySelectorAll('.bl_posts_item');
			const li_text = document.querySelectorAll('.bl_posts_summary');

			// 変数
			let searchWordIndex = data[i].plainText.indexOf(searchWord);
			let searchWordIndex_title = data[i].title.indexOf(searchWord);	// タイトル簡易検索
			let searchWordIndex_hashtags = data[i].hashtags.indexOf(searchWord);	// ハッシュタグ簡易検索
			let resultText = '…';

			// 表示調整用
			const resultLength = 42;	// 結果文字数＝先読み＋検索語句＋後読み
			const beforeLength = 15;	// 先読み、マッチした検索語句の何文字前から？
			const afterLength = resultLength - beforeLength - searchWord.length;	// 後読み
			
			// マッチしたときは（本文・タイトル・タグのいずれかに）
			if (searchWordIndex != -1 || searchWordIndex_title != -1 || searchWordIndex_hashtags != -1) {
				li[i].classList.remove('hp_hidden');	// 表示。
				// 検索語句が先頭に近すぎたら、
				if (searchWordIndex <= beforeLength) {
					searchWordIndex = beforeLength;	// 冒頭から表示して、
					resultText = '';	// 冒頭の'…'を削除。
				}				
				// 結果表示用の文字列
				resultText += data[i].plainText.substr(searchWordIndex - beforeLength, resultLength)
				// 検索語句が末尾より十分遠ければ、
				const searchWordIndex_last = searchWordIndex + searchWord.length + afterLength;
				if (searchWordIndex_last < data[i].plainText.length) {
					resultText += '…';	// 末尾に'…'を追加。
				} 
				// 検索語句をハイライト表示する
				resultText = resultText.replace(new RegExp(searchWord, "g"), `<span class="hp_highlight">${searchWord}<\/span>`);	// （変数を使って複数置換させる方法）
				// DOM要素として追加
				li_text[i].innerHTML = `<p>${resultText}</p>`;
			
			} else {
			// マッチしなかったときは、
				li[i].classList.add('hp_hidden');	// 非表示に。
			}
			
			// 検索フォームが空になったら、
			if (searchWord === '') {
				li_text[i].innerHTML = data[i].postText	// 元のテキストに戻す。
			};

		};	// for(){...
	};	// ---------- realTimeSearch() => {...

	// 文字入力されるたびに検索実行
	document.querySelector('.el_search_form').addEventListener('input', () => {
		realTimeSearch();
	});
	

// レンダリング 	---------------------------

	const renderHTML = (currentPage) => {
		document.getElementById('articleWrapper').innerHTML 
				= currentPage.html;	// 記事内容
		document.title = currentPage.pageTitle	// ブラウザのタイトル
		document.querySelector('.el_logo_suffix').innerText 
				= currentPage.suffix;	// ロゴのidカウンター
		document.querySelector("meta[name=description]").content
				= currentPage.description;	// 検索結果の説明文
	};

	class Article {
		constructor(i) {
			this.html = html_article(i);
			this.suffix = ` :: ${queries.id}`;
			// this.suffix = ` # 演劇`;
			this.description = `${data[i].plainText.substr(0, 110)}…`;
			this.pageTitle = this.makePageTitle(i);
		}
		
		makePageTitle(i) {
			if (data[i].title) {	// 記事タイトルが存在するなら、
				return `${data[i].title}｜placet experiri :: ${queries.id}`	// それをページタイトルの先頭に。
			} else {	// 記事タイトルが存在しないなら、
				return `placet experiri :: ${queries.id}`;	// デフォルトのidタイトルに。
			}
		}
	}

	// 個別記事ページ生成 ----------
	if (isFinite(queries.id)) {	// 数値判定
		const postCount = data.length - queries.id;	// 記事idはループカウントで言うと何番目か
		const article = new Article(postCount);
		// ページ生成
		renderHTML(article);
	};
	// 記事一覧ページ生成 ----------
	if (queries.id == null) {	
		document.getElementById('postListWrapper').innerHTML
				= html.join('');	// 配列を結合し、タグを書き換え
	};
	
	
	/* ---------------------------------
		テンプレート */
	// 記事一覧リスト
	function html_postlist(i) {
		return `
		<li class="bl_posts_item">
			<a href="?id=${data.length - i}">
				<header class="bl_posts_header">
					<time class="bl_posts_date" datetime="${moment(data[i].date).format("YYYY-MM-DD HH:mm")}">${moment(data[i].date).format("YYYY-MM-DD")}
					</time>
				</header>
				<h2 class="bl_posts_title">
					${data[i].title}
				</h2>
				<div class="bl_posts_summary">
					<p>${data[i].postText}</p>
				</div>
			</a>
			<footer class="bl_posts_footer">
				<span class="bl_posts_dateago">${moment(data[i].date).fromNow()}</span>
				<ul class="bl_tags">
					${data[i].hashtags}
				</ul>
			</footer>
		</li>`
	} // function html_postlist(i) {...

	// 個別記事ページ
	function html_article(i) {
		return `
			<header class="bl_text_header">
				<time class="bl_text_date" datetime="${moment(data[i].date).format("YYYY-MM-DD HH:mm")}">${moment(data[i].date).format("YYYY-MM-DD HH:mm")}
				</time>
			</header>
			<div class="bl_text">
				<h2 class="bl_text_title">${data[i].title}</h2>
				${data[i].text}
			</div>
			<footer class="bl_text_footer">
				<span class="bl_posts_dateago">${moment(data[i].date).fromNow()}</span>
				<ul class="bl_tags">
					${data[i].hashtags}
				</ul>
			</footer>`
	}	// function html_article(i) {...

	function template_hashtags(eachTag) {
		return `<li><a href="?tag=${eachTag}">#${eachTag}</a></li>`
	}
		// リンクにタグフィルター用のクエリ文字列を仕込む

//

})	// fetch.then((data) => {...
/*
.catch((err) => {
	console.log('インターネットの接続を確認して、ページを再読み込みしてください。');
});
*/
} // {...