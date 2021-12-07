import { defineBlogCard } from './BlogCard';
import { defineLinkInternal } from './LinkInternal';
import { activateSearchForm, notifyUpdate } from './bootstraps';
import { fetcher } from './lib/utils';
import { jsonToPost, JSONPost } from './post';
import { route } from './router';

const jsonPath = './posts.json';

(async function index() {
  const posts = jsonToPost(await fetcher<JSONPost[]>(jsonPath));

  route(posts);
  window.addEventListener('popstate', () => route(posts));

  defineLinkInternal(() => route(posts));
  defineBlogCard(posts);

  activateSearchForm(() => route(posts));
  notifyUpdate();
})();
