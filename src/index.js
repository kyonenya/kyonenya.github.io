'use strict'
import { getUrlQueries } from './router.js';
import { process } from './data.js';
import { createArticle, createPostlist, createTagged } from './model.js';
import { renderHTML } from './render.js';
import { realTimeSearch } from './search.js';
import { registerComponents } from './component.js';

const jsonPath = './data.json';

const route = (data, status) => {
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
    renderHTML(article);
    document.querySelector('.el_search_form').classList.add('hp_hidden');  // 検索フォームを非表示
  }
}

// JSONデータを取得して実行
const app = async () => {
  const response = await fetch(jsonPath);
  const data = await response.json();
  const posts = process(data);
  route(posts, getUrlQueries(window.location.search));
  document.querySelector('.el_search_form').addEventListener('input', () => realTimeSearch(posts));  // リアルタイム検索
  registerComponents(posts);
}

app();
