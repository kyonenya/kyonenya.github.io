'use strict'
{
// 変数宣言
	let h = "";
	const hashtags = [];
	const postTexts = [];

// URLからクエリ文字列を取得する関数
function getParam(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// ページidを取得、0以上の整数またはnull
let id = getParam('id');


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
		if (manuscripts[i].text.length > 300) {
			postTexts[i] = `${manuscripts[i].text.substr(0, 300)}…
			<div class="bl_posts_readmore">続きを読む</div>`;
		} else {
			postTexts[i] = manuscripts[i].text;
		};
		
		// 記事一覧ページのHTMLタグを積算
		h += htmlComb(i);
	}

	if (id == null) {
		$("#postlistWrapper").append(h);
	} else {
		$("#postWrapper").append(htmlComb_page(manuscripts.length - id));
		$('.el_logo_suffix').text(` :: ${id}`)
		$('title').html(`placet experiri :: ${id}`);
		document.getElementById('description').content = manuscripts[manuscripts.length - id].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0, 300); // HTMLタグを削除して先頭300文字をとる
	document.getElementById('ogDescription').content = manuscripts[manuscripts.length - id].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0, 300); // 同上
	};
	
}); // $.getJSON(){...
}); // $(function(){...


}