import { enrich } from './data.js';
import { route, queriesFor } from './router.js';
import { registerComponents } from './components.js';

const jsonPath = './data.json';

const index = async () => {
  document.querySelector('.el_search_form').addEventListener('input', () => {
    window.location.hash = encodeURIComponent(document.querySelector('.el_search_form').value);
  });
  const response = await fetch(jsonPath);
  const rawData = await response.json();
  const data = enrich(rawData);
  route(data, queriesFor(window.location.search));
  registerComponents(data);
  document.querySelectorAll('a').forEach(a => {
    a.onclick = (event) => {
      event.preventDefault();
      window.history.pushState(null, "", a.href);
      route(data, queriesFor(window.location.search));
    };
  });
  window.addEventListener("popstate", () => {
    route(data, queriesFor(window.location.search));
  });
};

index();
