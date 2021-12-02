import { enrich } from './data';
import { route } from './router';
import { activateSearchForm } from './search';
import { registerBlogCard } from './BlogCard';
import { registerLinkInternal } from './LinkInternal';
import { fetcher } from './utils';
import { notifyUpdate } from './notify';
import { datarable } from './types';

const jsonPath = './data.json';

const bootstrap = (data: datarable[]): void => {
  route(data);
  window.addEventListener('popstate', () => route(data));

  registerLinkInternal(() => route(data));
  registerBlogCard(data);

  activateSearchForm(() => route(data));
  notifyUpdate();
};

void (async function index() {
  const rawData = await fetcher<datarable[]>(jsonPath);
  const data = enrich(rawData);
  bootstrap(data);
})();
