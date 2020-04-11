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
$.getJSON("data.json", function(data) {

	// 記事リスト（HTMLタグ生成関数）
	function htmlComb(i) {
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
	function htmlComb_page(i) {
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

	for(var i in data){	
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
	
		// 長文の表示文字数を制限し、「続きを読む」を表示
		if (data[i].text.length > 200) {
			postTexts[i] = `${data[i].text.substr(0, 200).replace(/<a.*?>(.*?)<\/a>/, '$1')}…
			<div class="bl_posts_readmore">続きを読む</div>`;
		} else {
			postTexts[i] = data[i].text.replace(/<a.*?>(.*?)<\/a>/, '$1');
		};
		// 一覧表示ではリンクを削除
		// 配列を編集しても反映されないやつ。なので↑にメソッドチェーンで書いた

		// 記事一覧ページのHTMLタグを積算
		h += htmlComb(i);

	}

	if (id == 0) {
		$("#postlistWrapper").append(h);
	} else {
		$('.el_logo_suffix').text(` :: ${id}`)
		$('title').html(`placet experiri :: ${id}`);
		document.getElementById('description').content = data[data.length - id].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0, 140); // HTMLタグを削除して先頭140文字をとる
		document.getElementById('ogDescription').content = data[data.length - id].text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0, 140); // 同上、OGPはJS未対応なので無駄だけど
	// console.log(document.getElementById('ogDescription').content);
		$("#postWrapper").append(htmlComb_page(data.length - id));
	};
	
}); // $.getJSON(){...
}); // $(function(){...

}