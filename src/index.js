import { enrich } from './data.js';
import { route } from './router.js';
import { registerComponents } from './components.js';

const jsonPath = './data.json';

const index = async () => {
  document.querySelector('.el_search_form').addEventListener('input', () => {
    window.location.hash = encodeURIComponent(
      document.querySelector('.el_search_form').value
    );
  });
  const response = await fetch(jsonPath);
  const rawData = await response.json();
  const data = enrich(rawData);
  route(data);
  window.addEventListener('popstate', () => route(data));
  registerComponents(data);
};

index();
