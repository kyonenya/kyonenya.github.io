import { getUrlQueries } from './router.js';
import { process } from './data.js';
import { html } from './html.js';
import { render } from './render.js';
import { realTimeSearch } from './search.js';
import { registerComponents } from './component.js';

const jsonPath = './data.json';

const route = (data, status) => {
  if (status.id == null && status.tag) {
    render(html.taggedPostList(data, status.tag));
  } else if (status.id == null) {
    render(html.postList(data));
  }
  if (Number.isFinite(Number(status.id))) {
    render(html.article(data[data.length - status.id])); 
    document.querySelector('.el_search_form').classList.add('hp_hidden'); // 検索フォームを非表示
  }
};

// JSONデータを取得して実行
const app = async () => {
  const response = await fetch(jsonPath);
  const rawData = await response.json();
  const data = process(rawData, getUrlQueries(window.location.search).tags);
  route(data, getUrlQueries(window.location.search));
  document.querySelector('.el_search_form').addEventListener('input', () => realTimeSearch(data)); // リアルタイム検索
  registerComponents(posts);
};

app();
