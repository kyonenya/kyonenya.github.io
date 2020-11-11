'use strict'
import { getUrlQueries } from './router.js';
import { process } from './data.js';
import { createArticle, createPostlist, createTagged } from './model.js';
import { renderHTML } from './render.js';
import { realTimeSearch } from './search.js';

  // 表示調整用
  const jsonPath = './data.json';

  // クエリを取得する
  const queryStr = window.location.search.slice(1);  // 'foo=1&bar=2'、文頭の'?'を除外
  const status = getUrlQueries(queryStr);

  const app = (data) => {
    // 下準備・データの加工 
    data = process(data);
  
    for (const eachData of data) {  
      // 6. 表示・非表示フラグを、タグフィルターに応じてセットしておく
      const tagExists = eachData.tags.includes(status.tag);  // タグ検索にヒットしたか
      // タグ検索がOFFか、またはタグ検索にヒットしているならば、
      eachData.isVisible = status.tag == null || tagExists
        ? true  // 表示。
        : false;
    }

    // ルーティング
    if (status.id == null && status.tag) {
        const postlist_tagged = createTagged(data, status.tag);
        renderHTML(postlist_tagged);
    } else if (status.id == null) {
        const postlist = createPostlist(data); 
        renderHTML(postlist);
    }
    if (isFinite(status.id)) {  // 数値判定
        const i = data.length - status.id;  // 記事idはループカウントで言うと何番目か
        const article = createArticle(data[i]);
        renderHTML(article);  // ページ生成
        document.querySelector('.el_search_form')
            .classList.add('hp_hidden');  // 検索フォームを非表示
    }

    // リアルタイム検索
    document.querySelector('.el_search_form').addEventListener('input', () => {
        realTimeSearch(data);
    });

    // ブログカード
    class BlogCard extends HTMLElement {
      constructor() {
        super();
        this.id = this.getAttribute('id');
        this.i = data.length - this.id;
        this.hashtags = data[this.i].tags
            .map((eachTag) => `<li>#${eachTag}</li>`)
            .join('');
        this.innerHTML = `
        <div class="bl_blogcard">
            <a href="?id=${this.id}">
            <header class="bl_blogcard_header">
                <div class="bl_blogcard_icon"></div>
                <div class="bl_blogcard_logo">placet experiri</span>
                <span class="bl_blogcard_suffix"> :: ${this.id}</span>
            </header>
            <div class="bl_blogcard_title">${data[this.i].title}</div>
            <p class="bl_blogcard_text">${data[this.i].plainText.substr(0, 56)}…</p>
            <footer class="bl_blogcard_footer">
                <span class="bl_blogcard_time">${dayjs(data[this.i].date).format("YYYY-MM-DD")}</span>
                <ul class="bl_blogcard_tags">
                ${this.hashtags}
                </ul>
            </footer>
            </a>
        </div>`;
      }
    }

    // レンダリングと結びつける
    // 第一引数にHTML上のカスタムエレメント、第二引数にJS上のクラス名
    window.customElements.define('blog-card', BlogCard);
  }

// JSONデータを取得して実行
const index = async () => {
  const response = await fetch(jsonPath);
  const data = await response.json();
  app(data);
}

index();
