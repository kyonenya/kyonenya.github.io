import { enrich } from './data.js';
import { route, queriesFor } from './router.js';
import { searchPosts } from './search.js';
import { registerComponents } from './components.js';

const jsonPath = './data.json';

const app = async () => {
  const response = await fetch(jsonPath);
  const rawData = await response.json();
  const data = enrich(rawData);
  route(data, queriesFor(window.location.search));
  document.querySelector('.el_search_form').addEventListener('input', () => searchPosts(data));
  registerComponents(data);
};

app();
