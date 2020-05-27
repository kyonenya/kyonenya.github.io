'use strict'
{	
	// メンテナンス用
	const shortTextLength = 125;	// 記事一覧に何文字表示するか
	const jsonPath = 'data-200527.json';

	// その他変数宣言
	let html = [];
	const hashtags = [];
	const postTexts = [];	// 記事一覧への表示用テキスト
	const plainTexts = [];	// 全文検索などに使う

	/* ---------------------------------
		URLからクエリ文字列を取得 */
	const getUrlQueries = () => {
		const queries = {};
		const queryStr = window.location.search.slice(1);	// 文頭の'?'を除外
		//	const queryStr = 'foo=1&bar=2';
	
	  // クエリがない場合は、
		if (!queryStr) {
			return queries;	// 空のオブジェクトを返す。
		}
	
	  // 複数のクエリを'&'で切って配列へと分解
		const queryArr = queryStr.split('&')	// ['foo=1', 'bar=2']
	
		queryArr.forEach((eachQueryStr) => {
			// '='でさらに分割してそれぞれkey,valueへと格納
			const keyAndValue = eachQueryStr.split('=');	// ['foo', '1']
			queries[keyAndValue[0]] = keyAndValue[1];	// {foo: 1}
		});
		
		return queries;
	}
	
	// 実行
	const queries = getUrlQueries();
	const postId = queries.id;
	

/* JSONデータ取得開始 ---------- */
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
	})
*/
	for (var i = 0; i < data.length; i=i+1) {

		// ダブルダッシュ——が途切れてしまうので罫線に変更
		data[i].text = data[i].text.replace(/——/g, '──');

		// プレーンテキストを生成して配列に格納
		plainTexts[i] = data[i].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');

		// ハッシュタグをli要素として生成して結合
		hashtags[i] = ""	// 初期化
		for (var j in data[i].tags) {
			hashtags[i] += `<li><span>#${data[i].tags[j]}</span></li>`;
		};

		// 記事一覧リストでの表示用文字列を作る
		postTexts[i] = plainTexts[i];
		// 長文なら省略して「…」を追加
		if (postTexts[i].length > shortTextLength) {
			postTexts[i] = `${postTexts[i].substr(0, shortTextLength)}…`;
		};
	
		// 記事一覧ページのHTMLタグを積算
		if (data[i].title) {	// 存在判定
			html.push(htmlComb_postlist(i));
		} else {
			html.push(htmlComb_postlist(i).replace(/<h2.*h2>/m, ''));
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
			let searchWordIndex = plainTexts[i].indexOf(searchWord);
			let resultText = '…';

			// 表示調整用
			const beforeLength = 16;	// 先読み、マッチした検索語句の何文字前から？
			const afterLength = 26;	// 後読み
			const resultLength = beforeLength + searchWord.length + afterLength;	// 結果文字数＝先読み＋検索語句＋後読み
		
			// マッチしたときは、
			if (searchWordIndex != -1) {
				li[i].classList.remove('hp_hidden');	// 表示。
				// 検索語句が先頭に近すぎたら、
				if (searchWordIndex <= beforeLength) {
					searchWordIndex = beforeLength;	// 冒頭から表示して、
					resultText = '';	// 冒頭の'…'を削除。
				}				
				// 結果表示用の文字列
				resultText += plainTexts[i].substr(searchWordIndex - beforeLength, resultLength)
				// 検索語句が末尾より十分遠ければ、
				const searchWordIndex_last = searchWordIndex + searchWord.length + afterLength;
				if (searchWordIndex_last < plainTexts[i].length) {
					resultText += '…';	// 末尾に'…'を追加。
				} 
				// 検索語句をハイライト表示する
				resultText = resultText.replace(new RegExp(searchWord, "g"), `<span class="hp_highlight">${searchWord}<\/span>`);	// 変数を使って複数置換させる
				// DOM要素として追加
				li_text[i].innerHTML = `<p>${resultText}</p>`;
			
			} else {
			// マッチしなかったときは、
				li[i].classList.add('hp_hidden');	// 非表示に。
			}
			
			// 検索フォームが空になったら、
			if (searchWord === '') {
				li_text[i].innerHTML = postTexts[i]	// 元のテキストに戻す。
			};

		};	// for(){...
	};	// realTimeSearch() => {...

	// 文字入力されるたびに検索実行
	document.querySelector('.el_search_form').addEventListener('input', () => {
		realTimeSearch();
	});

	
	/* ---------------------------------
		HTML生成 */	
	if (postId == null) {
		document.querySelector('.bl_posts').innerHTML
				= html.join('');	// タグを直接書き換え、配列を結合
	} 
	else {
		// 記事idはループカウントで言うと何番目か
		const postCount = data.length - postId;	
		// 記事内容の生成
		document.getElementById('postWrapper').innerHTML
				= htmlComb_article(postCount);
		// ロゴに' :: 1'を追加。
		document.querySelector('.el_logo_suffix').innerText 
				= ` :: ${postId}`;
		// ブラウザのタイトルを書き換え
		if (data[postCount].title) {	// 存在判定
			// 記事タイトルが存在するならそれを先頭に
			document.title = `${data[postCount].title}｜placet experiri :: ${postId}`;
		} else {
			// 記事タイトルが存在しなければデフォルトのidタイトル
			document.title = `placet experiri :: ${postId}`;
		}
		// meta descriptionを書き換え
		document.querySelector("meta[name=description]").content
				= plainTexts[postCount].substr(0, 110);	// プレーンテキストの先頭110文字
		// 検索フォームを非表示に
		document.querySelector('.el_search_form').classList.add('hp_hidden');
	};


	/* ---------------------------------
		テンプレート */
	// 記事一覧リスト
	function htmlComb_postlist(i) {
		return `
		<li class="bl_posts_item">
			<a href="?id=${data.length - i}">
				<header class="bl_posts_header">
					<time class="bl_posts_date" datetime="${moment(data[i].date).format("YYYY-MM-DD HH:mm")}">${moment(data[i].date).format("YYYY-MM-DD")}
					</time>
				</header>
				<h2 class="bl_posts_title hp_underline">${data[i].title}</h2>
				<div class="bl_posts_summary">
					<p>${postTexts[i]}</p>
				</div>
				<footer class="bl_posts_footer">
					<span class="bl_posts_dateago">${moment(data[i].date).fromNow()}</span>
					<ul class="bl_tags">
						${hashtags[i]}
					</ul>
				</footer>
			</a>
		</li>`
	} // function htmlComb_postlist(i) {...

	// 個別記事ページ
	function htmlComb_article(i) {
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
					${hashtags[i]}
				</ul>
			</footer>`
	}	// function htmlComb_article(i) {...


})	// fetch.then((data) => {...
/*
.catch((err) => {
	console.log('インターネットの接続を確認して、ページを再読み込みしてください。');
});
*/
} // {...