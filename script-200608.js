'use strict'
{	
	// 表示調整用
	const jsonPath = 'data-200608.json';


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
		下準備・データの加工 */
		
	// data[]オブジェクト配列にプロパティを追加
	for (const eachData of data) {	

		// 1. ダブルダッシュ——が途切れてしまうので罫線二つに置換しておく
		eachData.text = eachData.text.replace(/——/g, '──');
		eachData.title = eachData.title.replace(/——/g, '──');

		// 2. マークアップを削除してプレーンテキストを生成しておく
		eachData.plainText = eachData.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');

		// 3. 記事一覧リストでの表示用文字列を作っておく
		const postTextLength = 125;	// 記事一覧に何文字表示するか	
		// 長文なら、
		if (eachData.plainText.length > postTextLength) {
			eachData.postText = `${eachData.plainText.substr(0, postTextLength)}…`;	// 冒頭n文字分だけを省略表示。
		} else {	// 短文なら、
			eachData.postText = eachData.plainText;	// プレーンテキストそのまま
		};

		// 4.  ハッシュタグを生成しておく
		eachData.hashtags = eachData.tags
				.map((eachTag) => {return template_hashtags(eachTag)})
				.join('');
				
		// 5. 記事リストのHTMLを生成しておく
		const i = data.length - eachData.id;
		eachData.postHtml = html_postlist(i);
	}


	/* ---------------------------------
		記事一覧ページ生成 */
	const renderHTML = (currentPage) => {
		document.getElementById('root').innerHTML
				= currentPage.html;	// 記事内容
		if (currentPage.pageTitle) {
			document.title = currentPage.pageTitle;	// ブラウザのタイトル
		}
		if (currentPage.suffix) {
			document.querySelector('.el_logo_suffix').innerText 
					= currentPage.suffix;	// ロゴのidカウンター
		}
		if (currentPage.description) {
			document.querySelector('meta[name=description]').content
					= currentPage.description;	// メタタグの説明文			
		}
		if (currentPage.archiveHeader) {
			document.querySelector('.el_archive_header').innerText
					= currentPage.archiveHeader;	// 記事検索時に現れる、ページ上部のナビゲーションバー
		}
	};

	const postlist = {
		// この配列に登録されたidだけが記事リストに表示される
		onView: data.map((eachData) => {	
			const tagExists = eachData.tags.includes(queries.tag);	// タグ検索結果
			// タグ検索がOFFか、またはタグ検索にヒットしているならば、
			if (queries.tag == null || tagExists) {
				return eachData.id;	// 表示リストにidを登録。
			}
		}),
		html: '',/*data.map((eachData) => {
			if (this.onView.includes(eachData.id)) {
				return eachData.postHtml;
			};
		}).join('')*/	// 同じオブジェクト内のonViewを参照するのは無理。
		suffix: '',
		description: '',
		pageTitle: `#演技｜placet experiri`,
		archiveHeader: ``,
	}

	postlist.html = `
		<ul class="bl_posts">
			${data.map((eachData) => {
				if (postlist.onView.includes(eachData.id)) {
					return eachData.postHtml;
				};
			}).join('')}
		</ul>`

	if (queries.id == null) {	
		// document.getElementById('postListWrapper').innerHTML
				// = postlist.html;
		renderHTML(postlist);
	};


// 個別記事ページ ---------------------------

	class Article {
		constructor(i) {
			this.html = html_article(i);
			this.suffix = ` :: ${queries.id}`;
			// this.suffix = ` # 演劇`; 
			this.description = `${data[i].plainText.substr(0, 110)}…`;
			this.pageTitle = data[i].title	// 記事タイトルの存在判定
				? `${data[i].title}｜placet experiri :: ${queries.id}`	// タイトルあり
				: `placet experiri :: ${queries.id}`;	// タイトルなし
			this.archiveHeader = '';
		}
	}

	// 個別記事ページ生成 ----------
	if (isFinite(queries.id)) {	// 数値判定
		const postCount = data.length - queries.id;	// 記事idはループカウントで言うと何番目か
		const article = new Article(postCount);
		// ページ生成
		renderHTML(article);
	};
	
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
		<article>
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
			</footer>
		</article>`
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