'use strict'
{	
	// 表示調整用
	const jsonPath = 'data.json';

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
	const status = getUrlQueries();
	//status.onView = [];

/* JSONデータ取得開始 --------------------  */
fetch(jsonPath)
 .then((response) => response.json())
 .then((data) => {

/* ---------------------------------
	下準備・データの加工 */
	for (const eachData of data) {	// data[]オブジェクト配列にプロパティを追加

		// 1. ダブルダッシュ——が途切れてしまうので罫線二つに置換しておく
		eachData.text = eachData.text.replace(/——/g, '──');
		eachData.title = eachData.title.replace(/——/g, '──');

		// 2. マークアップを削除してプレーンテキストを生成しておく
		eachData.plainText = eachData.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');

		// 3. 記事一覧リストでの表示用文字列を作っておく
		const postTextLength = 125;	// 記事一覧に何文字表示するか？
		// 長文なら、
		if (eachData.plainText.length > postTextLength) {
			eachData.postText = `${eachData.plainText.substr(0, postTextLength)}…`;	// 冒頭n文字分だけを省略表示。
		} else {	// 短文なら、
			eachData.postText = eachData.plainText;	// プレーンテキストそのまま
		};

		// 4.  ハッシュタグを生成しておく
		eachData.hashtags = eachData.tags
				.map((eachTag) => {
					if (eachTag === status.tag) {	// タグフィルターにマッチしているなら、
						return html_hashtags_highlighted(eachTag);	// 当該タグをハイライト。
					} else {
						return html_hashtags(eachTag);
					}
				})
				.join('');
				
		// 5. 記事リストのHTMLを生成しておく
		const i = data.length - eachData.id;
		eachData.postHtml = html_postlist(i);
		
		// 6. 表示・非表示フラグを、タグフィルターに応じてセットしておく
		const tagExists = eachData.tags.includes(status.tag);	// タグ検索にヒットしたか
		// タグ検索がOFFか、またはタグ検索にヒットしているならば、
		eachData.isVisible = status.tag == null || tagExists
				? true	// 表示。
				: false;
	}


/* ---------------------------------
	記事一覧ページ生成 */
	const postlist = {
		html: `<ul class="bl_posts">${
			data.map((eachData) => {
					if (eachData.isVisible === true) {
						return eachData.postHtml;
					};
				}).join('')
			}</ul>`,
		suffix: '',
		description: '',
		pageTitle: status.tag	// exists?
				? `#${status.tag}｜placet experiri`	// タグ検索時
				: '',	// デフォルト
		archiveHeader: status.tag	// exists?
				? `#${status.tag}`	// タグ検索時
				: '',	// デフォルト
	}

	// レンダリング
	if (status.id == null) {	
		renderHTML(postlist);
	};
	

/* ---------------------------------
	個別記事ページ生成 */
	class Article {
		constructor(i) {
			this.html = html_article(i);
			this.suffix = ` :: ${status.id}`;
			this.description = `${data[i].plainText.substr(0, 110)}…`;
			this.pageTitle = data[i].title	// exists?
				? `${data[i].title}｜placet experiri :: ${status.id}`	// 記事タイトルあり
				: `placet experiri :: ${status.id}`;	// 記事タイトルなし
			this.archiveHeader = '';
		}
	}

	// レンダリング
	if (isFinite(status.id)) {	// 数値判定
		const i = data.length - status.id;	// 記事idはループカウントで言うと何番目か
		const article = new Article(i);
		renderHTML(article);	// ページ生成
		document.querySelector('.el_search_form')
				.classList.add('hp_hidden');	// 検索フォームを非表示
	};
	
	
	/* ---------------------------------
		リアルタイム検索 */
	/* 検索関数 ---------- */
	const realTimeSearch = () => {

		// 検索ボックスに入力された値
		const searchWord = document.querySelector('.el_search_form').value;
		
		// 全件ループ開始
		for (const eachData of data) {
		
			if (eachData.isVisible === false) {	// 記事一覧に表示されてなければ、
				continue;	// スキップして次の記事へ。
			};
		
			// const i = data.length - eachData.id;
			const li = document.querySelector(`.bl_posts_item[data-id="${eachData.id}"]`);
			const li_text = document.querySelector(`.bl_posts_summary[data-id="${eachData.id}"]`);
			
			let searchWordIndex = eachData.plainText.indexOf(searchWord);
			let searchWordIndex_title = eachData.title.indexOf(searchWord);	// タイトル簡易検索
			let searchWordIndex_hashtags = eachData.hashtags.indexOf(searchWord);	// ハッシュタグ簡易検索
			let resultText = '…';
			
			// 表示調整用
			const resultLength = 41;	// 検索結果に表示したい文字数は？
			const beforeLength = 15;	// 先読み、マッチした検索語句の何文字前から表示したい？
			const afterLength = resultLength - beforeLength - searchWord.length;	// 後読み
			
			// マッチしたときは（本文・タイトル・タグのいずれかに）
			if (searchWordIndex != -1 || searchWordIndex_title != -1 || searchWordIndex_hashtags != -1) {
				li.classList.remove('hp_hidden');	// 表示。
				
				// 検索語句が先頭に近すぎたら、
				if (searchWordIndex <= beforeLength) {
					searchWordIndex = beforeLength;	// 冒頭から表示して、
					resultText = '';	// 冒頭の'…'を削除。
				}				
				// 結果表示用の文字列
				resultText += eachData.plainText.substr(searchWordIndex - beforeLength, resultLength)
				// 検索語句が末尾より十分遠ければ、
				const searchWordIndex_last = searchWordIndex + searchWord.length + afterLength;
				if (searchWordIndex_last < eachData.plainText.length) {
					resultText += '…';	// 末尾に'…'を追加。
				} 
				// 検索語句をハイライト表示する
				resultText = resultText.replace(new RegExp(searchWord, "g"), `<span class="hp_highlight">${searchWord}<\/span>`);	// （変数を使って複数置換させる方法）
				// DOM要素として追加
				li_text.innerHTML = `<p>${resultText}</p>`;
				
			} else {
			// マッチしなかったときは、
				li.classList.add('hp_hidden');	// 非表示に。
			}
			
			// 検索フォームが空になったら、
			if (searchWord === '') {
				li_text.innerHTML = eachData.postText	// 元のテキストに戻す。
			};

		};	// for(){...
	};	// ---------- realTimeSearch() => {...

	// 文字入力されるたびに検索実行
	document.querySelector('.el_search_form').addEventListener('input', () => {
		realTimeSearch();
	});

	
	/* ---------------------------------
		テンプレート */		// 関数の巻き上げを使って上から参照する

	// 記事一覧リスト
	function html_postlist(i) {
		return `
		<li class="bl_posts_item" data-id=${data.length - i}>
			<a href="?id=${data.length - i}">
				<header class="bl_posts_header">
					<time class="bl_posts_date" datetime="${moment(data[i].date).format("YYYY-MM-DD HH:mm")}">${moment(data[i].date).format("YYYY-MM-DD")}
					</time>
				</header>
				<h2 class="bl_posts_title">
					${data[i].title}
				</h2>
				<div class="bl_posts_summary" data-id=${data.length - i}>
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
	}

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
	}

	//  ハッシュタグ（共通部品）
	function html_hashtags(eachTag) {
		return `<li><a href="?tag=${eachTag}">#${eachTag}</a></li>`	// リンクにタグフィルター用のクエリ文字列を仕込む
	}
	// ハッシュタグ、ハイライトされたとき
	function html_hashtags_highlighted(eachTag) {
		return `<li><a href="?tag=${eachTag}" class="hp_highlight">#${eachTag}</a></li>`	// リンクにタグフィルター用のクエリ文字列を仕込む
	}

	// レンダラー（汎用）
	function renderHTML(currentPage) {
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
	}

})	// fetch.then((data) => {...

} // {...