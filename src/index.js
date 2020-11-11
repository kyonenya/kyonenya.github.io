'use strict'
import { getUrlQueries } from './router.js';
import { process } from './data.js';
import { createArticle, createPostlist, createTagged } from './model.js';
import { renderHTML } from './render.js';
import { realTimeSearch } from './search.js';
import { registerComponents } from './component.js';

const jsonPath = './data.json';

  const app = (data) => {
    // クエリを取得する
    const status = getUrlQueries(window.location.search);

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
        document.querySelector('.el_search_form').classList.add('hp_hidden');  // 検索フォームを非表示
    }

    // リアルタイム検索
    document.querySelector('.el_search_form').addEventListener('input', () => realTimeSearch(data));
  }

// JSONデータを取得して実行
const index = async () => {
  const response = await fetch(jsonPath);
  const data = await response.json();
  const posts = process(data);
  app(posts);
  registerComponents(posts);
}

index();
