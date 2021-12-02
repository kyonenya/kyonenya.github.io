import { enrich } from './data';
import { route } from './router';
import { registerBlogCard } from './BlogCard';
import { registerLinkInternal } from './LinkInternal';
import { fetcher } from './utils';
import { notifyUpdate } from './notify';
import { datarable } from './types';

const jsonPath = './data.json';
const searchFormElement = <HTMLFormElement>(
  document.querySelector('.el_search_form')
);
const searchInputElement = <HTMLInputElement>(
  document.querySelector('.el_search_input')
);

const bootstrap = (data: datarable[]): void => {
  route(data);
  window.addEventListener('popstate', () => route(data));

  registerLinkInternal(() => route(data));
  registerBlogCard(data);

  searchFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    window.history.pushState(
      `${window.location.search}#${searchInputElement.value}`,
      '',
      `${window.location.search}#${searchInputElement.value}`
    );
    route(data);
  });

  notifyUpdate();
};

void (async function index() {
  const rawData = await fetcher<datarable[]>(jsonPath);
  const data = enrich(rawData);
  bootstrap(data);
})();
