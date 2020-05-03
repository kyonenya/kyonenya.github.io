'use strict'
{	
	// 定数宣言
	let html = [];
	const hashtag = [];
	const shortTextLength = 140;
	const postTexts = [];	// 記事リスト表示用
	const plainTexts = [];	// 全文検索用

	// URLからクエリ文字列を取得
	function getId() {
		const queryStr = window.location.search.slice(1); // "id=3&p=2"
		if (!queryStr) { // 非存在判定
			return '0';
		}
		// matchで'id=123'を抽出、replaceで'id='を消して'123'を返す
		return queryStr.match(/id=\d+/)[0].replace(/id=/, '')
	}
	// 取得
	let id = getId();

/* -- JSONデータ取得開始 -- */
$(function(){
$.getJSON("data.json", function(data) {
	// セレクター
	const input = document.getElementById('input_searchWord');
	const ul = document.getElementById('postlistWrapper');

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
		// プレーンテキストを生成して配列に格納
		plainTexts[i] = data[i].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
		
		// ダブルダッシュ——が途切れてしまうので罫線に変更
		data[i].text = data[i].text.replace(/——/g, '──');

		// ハッシュタグをli要素として生成して結合
		hashtag[i] = ""	// 初期化
		for (var j in data[i].tags) {
			hashtag[i] += `<li><span>#${data[i].tags[j]}</span></li>`;
		};

	// 記事一覧リストの表示文字数を制限する
		// まずa, hr, blockquoteタグを削除、それから複数段落を一つの段落へと統合
		const eachShortText 
				= data[i].text
					.replace(/<\/?a.*?>|<hr>|<\/?blockquote>/g, '')
					.replace(/<\/p><p>/g, '');

		// 長文なら省略表示をして「…」を追加
		if (data[i].text.length > shortTextLength) {
			postTexts[i] = `${eachShortText.substr(0, shortTextLength)}…`;
		} else {
			postTexts[i] = data[i].eachShortText;
		};
		
		// 記事一覧ページのHTMLタグを積算
		html.push(htmlComb(i));

	} // for() {...

/* ---------------------------------
	リアルタイム検索 */
	
	// 検索関数
	const searchWord = () => {
		const searchWord = input.value; // 検索ボックスに入力された値
		// 全件ループ開始
		for (var i = 0; i < data.length; i=i+1) {
			const li = document.querySelectorAll('.bl_posts_item');
			const li_text = document.querySelectorAll('.bl_posts_item .bl_text');
			let searchWordIndex = plainTexts[i].indexOf(searchWord);
			let resultText = '…';

			// 表示調整用
			const beforeLength = 16; // 先読み、マッチした検索語句の何文字前から？
			const afterLength = 26; // 後読み
			const resultLength = beforeLength + searchWord.length + afterLength; // 先読み＋検索語句＋後読み＝結果文字列
		
			// マッチしたときは、
			if (searchWordIndex != -1) {
				li[i].classList.remove('hp_hidden'); // 表示。				
				// 検索語句が先頭に近すぎたら、
				if (searchWordIndex <= beforeLength) {
					searchWordIndex = beforeLength; // 冒頭から表示して、
					resultText = ''; // 冒頭の'…'を削除。
				}				
				// 結果表示用の文字列
				resultText += plainTexts[i].substr(searchWordIndex - beforeLength, resultLength)
				// 検索語句が末尾より十分遠ければ、
				const lastIndex = searchWordIndex + searchWord.length + afterLength;
				if (lastIndex < plainTexts[i].length) {
					resultText += '…'; // 末尾に'…'を追加。
				}
				// 検索語句をハイライト表示する
				resultText = resultText.replace(new RegExp(searchWord, "g"), `<span class="hp_highlight">${searchWord}<\/span>`); // 変数を使って複数置換させる
				// DOM要素として追加
				li_text[i].innerHTML = `<p>${resultText}</p>`;
			
			} else {
			// マッチしなかったときは、
				li[i].classList.add('hp_hidden'); // 非表示に。
			}
			
			// 検索フォームが空になったら、
			if (searchWord === '') {
				li_text[i].innerHTML = postTexts[i] // 元のテキストに戻す。
			};

		}; // for(){...
	}; // searchWord()...

	// 文字入力されるたびに検索実行
	input.addEventListener('input', () => {
		searchWord();
	});

/* ---------------------------------
	HTML生成 */
	
	if (id == 0) {
		// $("#postlistWrapper").append(html);
		// const htmlElement = document.createElement(li);
		ul.innerHTML = html.join(''); // タグを直接書き換え、結合
	
	} else {
		$("#postWrapper").append(htmlComb_page(data.length - id));
		$('.el_logo_suffix').text(` :: ${id}`)
		$('title').html(`placet experiri :: ${id}`);
		document.getElementById('description').content = data[data.length - id].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0, 140); // HTMLタグを削除して先頭140文字をとる
		document.getElementById('ogDescription').content = data[data.length - id].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0, 140); // 同上、OGPはJS未対応なので無駄だけど
		input.classList.add('hp_hidden'); // 検索フォームを非表示に
	};

/* ---------------------------------
	HTMLテンプレート */
	// 記事リスト（HTMLタグ生成関数）邪魔なので末尾に。関数の巻き上げ。
	function htmlComb(i) {
		return `
		<li class="bl_posts_item">
			<a href="?id=${data.length - i}">
				<header class="bl_posts_header">
					<time class="bl_posts_date" datetime="${moment(data[i].date).format("YYYY-MM-DD HH:mm")}">${moment(data[i].date).format("YYYY-MM-DD")}</time>
				</header>
				<div class="bl_text">
					${postTexts[i]}</div>
				<footer class="bl_posts_footer">
					<span class="bl_posts_dateago">${moment(data[i].date).fromNow()}</span>
					<ul class="bl_tags">
						${hashtag[i]}
					</ul>
				</footer>
			</a>
		</li>`
	}

	// 個別記事ページ（HTMLタグ生成関数）
	function htmlComb_page(i) {
		return `
			<header class="bl_text_header">
				<time class="bl_text_date" datetime="${moment(data[i].date).format("YYYY-MM-DD HH:mm")}">${moment(data[i].date).format("YYYY-MM-DD HH:mm")}</time>
			</header>
			<div class="bl_text">
				${data[i].text}
			</div>
			<footer class="bl_text_footer">
				<span class="bl_posts_dateago">${moment(data[i].date).fromNow()}</span>
				<ul class="bl_tags">
					${hashtag[i]}
				</ul>
			</footer>`
	} // function htmlComb_page(i) {...

}); // $.getJSON(){...
}); // $(function(){...
} // {...