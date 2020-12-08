import { enrich } from './data';
import { route } from './router';
import { registerComponents } from './components';

const jsonPath = './data.json';

const index = async () => {
  const formElement = <HTMLFormElement>document.querySelector('.el_search_form');
  formElement.addEventListener('input', () => {
    window.location.hash = encodeURIComponent(formElement.value);
  });
  const response = await fetch(jsonPath);
  const rawData = await response.json();
  const data = enrich(rawData);
  route(data);
  window.addEventListener('popstate', () => route(data));
  registerComponents(data);
};

index();
