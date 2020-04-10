'use strict'
{
	// 変数宣言
	let h = "";
	const hashtags = [];
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
$.getJSON("manuscript.json", function(manuscripts){

	// 記事リスト（HTMLタグ生成関数）
	function htmlComb(i) {
		return `
		<li class="bl_posts_item">
		<a href="?id=${manuscripts.length - i}">
			<header class="bl_posts_header">
				<time class="bl_posts_date" datetime="${moment(manuscripts[i].date).format("YYYY-MM-DD HH:mm")}">
					${moment(manuscripts[i].date).format("YYYY-MM-DD")}
				</time>
			</header>
			<div class="bl_text">
				${postTexts[i]}
			</div>
			<footer class="bl_posts_footer">
				<span class="bl_posts_dateago">
					${moment(manuscripts[i].date).fromNow()}
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
	function htmlComb_page(i) {
		return `
		<article class="">
		<header class="bl_text_header">
			<time class="bl_text_date" datetime="${moment(manuscripts[i].date).format("YYYY-MM-DD HH:mm")}">
				${moment(manuscripts[i].date).format("YYYY-MM-DD HH:mm")}
			</time>
		</header>
		<div class="bl_text">
			${manuscripts[i].text}
		</div>
		<footer class="bl_text_footer">
			<span class="bl_posts_dateago">
				${moment(manuscripts[i].date).fromNow()}
			</span>
			<ul class="bl_tags">
				${hashtags[i]}
			</ul>
		</footer>
		</article>`
	}

	for(var i in manuscripts){	
		// ハッシュタグをli要素として生成
		hashtags[i] = ""	// 初期化
		for (var j in manuscripts[i].tags) {
			hashtags[i] += `
			<li>
				<span>
					#${manuscripts[i].tags[j]}
				</span>
			</li>`;
		};
	
		// 長文の表示文字数を制限し、「続きを読む」を表示
		if (manuscripts[i].text.length > 200) {
			postTexts[i] = `${manuscripts[i].text.substr(0, 200)}…
			<div class="bl_posts_readmore">続きを読む</div>`;
		} else {
			postTexts[i] = manuscripts[i].text;
		};
		
		// 記事一覧ページのHTMLタグを積算
		h += htmlComb(i);
	}

	if (id == 0) {
		$("#postlistWrapper").append(h);
	} else {
		$("#postWrapper").append(htmlComb_page(manuscripts.length - id));
		$('.el_logo_suffix').text(` :: ${id}`)
		$('title').html(`placet experiri :: ${id}`);
		document.getElementById('description').content = manuscripts[manuscripts.length - id].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0, 200); // HTMLタグを削除して先頭200文字をとる
		document.getElementById('ogDescription').content = manuscripts[manuscripts.length - id].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0, 200); // 同上
		console.log(document.getElementById('ogDescription').content);
	};
	
}); // $.getJSON(){...
}); // $(function(){...

}