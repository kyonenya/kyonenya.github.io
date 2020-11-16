import { queriesFor } from './router.js';
import { enrich } from './data.js';
import { pages } from './pages.js';
import { render } from './render.js';
import { searchPosts } from './search.js';
import { registerComponents } from './components.js';

const jsonPath = './data.json';

const route = (data, queries) => {
  if (queries.id == null && queries.tag) {
    render(pages.taggedPostList(data, queries.tag));
  } else if (queries.id == null) {
    render(pages.postList(data));
  }
  if (Number.isFinite(Number(queries.id))) {
    render(pages.article(data[data.length - queries.id]));
    document.querySelector('.el_search_form').classList.add('hp_hidden'); // disable search form
  }
};

const app = async () => {
  const response = await fetch(jsonPath);
  const rawData = await response.json();
  const data = enrich(rawData);
  route(data, queriesFor(window.location.search));
  document.querySelector('.el_search_form').addEventListener('input', () => searchPosts(data));
  registerComponents(data);
};

app();
