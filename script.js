'use strict'
{
	// 定数宣言
	let h = "";
	const hashtags = [];
	const shortTextLength = 140;
	const postTexts = [];

	// URLからクエリ文字列を取得
	function getId() {
		const queryStr = window.location.search.slice(1); // "id=3&p=2"
		if (!queryStr) { // 非存在判定
			return '0';
		}
		// matchで'id=123'を抽出、replaceで'id='を消して'123'を返す
		return queryStr.match(/id=\d+/)[0].replace(/id=/, '')
	}
	// 取得（即時関数にするか）
	let id = getId();

/* -- JSONデータ取得開始 -- */
$(function(){
$.getJSON("data.json", function(data) {

	// 古い順にソート
/*	data.sort(function(a, b) {
		if (a.date > b.date) {
			return 1;
		} else {
			return -1;
		}
	})
	console.log(data);
*/

	// 記事リスト（HTMLタグ生成関数）
	const htmlComb = (i) => {
		return `
		<li class="bl_posts_item">
		<a href="?id=${data.length - i}">
			<header class="bl_posts_header">
				<time class="bl_posts_date" datetime="${moment(data[i].date).format("YYYY-MM-DD HH:mm")}">
					${moment(data[i].date).format("YYYY-MM-DD")}
				</time>
			</header>
			<div class="bl_text">
				${postTexts[i]}
			</div>
			<footer class="bl_posts_footer">
				<span class="bl_posts_dateago">
					${moment(data[i].date).fromNow()}
				</span>
				<ul class="bl_tags">
					${hashtags[i]}
				<ul>
			</footer>
		</a>
		</li>
		`
	}

	// 個別記事ページ（HTMLタグ生成関数）
	const htmlComb_page = (i) => {
		return `
		<article class="">
		<header class="bl_text_header">
			<time class="bl_text_date" datetime="${moment(data[i].date).format("YYYY-MM-DD HH:mm")}">
				${moment(data[i].date).format("YYYY-MM-DD HH:mm")}
			</time>
		</header>
		<div class="bl_text">
			${data[i].text}
		</div>
		<footer class="bl_text_footer">
			<span class="bl_posts_dateago">
				${moment(data[i].date).fromNow()}
			</span>
			<ul class="bl_tags">
				${hashtags[i]}
			</ul>
		</footer>
		</article>`
	} // function htmlComb_page(i) {...

	for (var i = 0; i < data.length; i=i+1) {
		// ハッシュタグをli要素として生成
		hashtags[i] = ""	// 初期化
		for (var j in data[i].tags) {
			hashtags[i] += `
			<li>
				<span>
					#${data[i].tags[j]}
				</span>
			</li>`;
		};

	// 記事一覧リストでは表示長文の表示文字数を制限する
		// 記事一覧の要約テキスト用に、dataオブジェクトに新しいプロパティ'shortText'を追加
		// まずa, hr, blockquoteタグを削除、それから複数段落を一つの段落へと統合
		data[i].shortText = data[i].text.replace(/<\/?a.*?>|<hr>|<\/?blockquote>/g, '').replace(/<\/p><p>/g, ''); 
		// console.log(data[i].shortText);

		// 長文なら省略表示をして「…」を追加
		if (data[i].text.length > shortTextLength) {
			postTexts[i] = `${data[i].shortText.substr(0, shortTextLength)}...`;
		} else {
			postTexts[i] = data[i].shortText;
		};

		// 【検索機能試作】
/*
			let searchWordIndex = data[i].text.indexOf('意味');
			console.log(searchWordIndex);
			if (searchWordIndex === -1) {
				continue; 
			}
			if (searchWordIndex <= 16) {
				searchWordIndex = 16; 
			}
			postTexts[i] = `…${data[i].text.substr(searchWordIndex - 16, 42)}…`;
*/
		// 記事一覧ページのHTMLタグを積算
		h += htmlComb(i);

	} // for (1 < i < data.length) {...


//--リアルタイム検索
	const textArea = document.getElementById('search-text');

	// 検索関数
	const searchWord = () => {
		const searchText = textArea.value; // 検索ボックスに入力された値
		let targetText;
		let ul_posts = document.querySelectorAll('.bl_posts_item');
		console.log(ul_posts[1].tagName);

		for (var i = 0; i < data.length; i=i+1) {
			targetText = data[i].text;
			
			// 検索対象となるリストに入力された文字列が存在するかどうかを判断
			if (targetText.indexOf(searchText) != -1) {
				ul_posts[i].classList.remove('hp_hidden');
			} else {
				ul_posts[i].classList.add('hp_hidden');
			}
			
		}; // for...
	}; // searchWord = function(){...

	// 文字入力されるたびに検索実行
	textArea.addEventListener('input', () => {
		searchWord();
	});

//--

	if (id == 0) {
		$("#postlistWrapper").append(h);
	} else {
		$("#postWrapper").append(htmlComb_page(data.length - id));	
		$('.el_logo_suffix').text(` :: ${id}`)
		$('title').html(`placet experiri :: ${id}`);
		document.getElementById('description').content = data[data.length - id].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0, 140); // HTMLタグを削除して先頭140文字をとる
		document.getElementById('ogDescription').content = data[data.length - id].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0, 140); // 同上、OGPはJS未対応なので無駄だけど
	};
	
}); // $.getJSON(){...
}); // $(function(){...

}