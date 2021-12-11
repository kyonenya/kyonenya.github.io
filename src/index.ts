import { defineBlogCard } from './BlogCard';
import { defineRouterLink } from './Link';
import { activateSearchForm, notifyUpdate } from './bootstraps';
import { fetcher } from './lib/utils';
import { jsonToPost, JSONPost } from './post';
import { route } from './route';

const jsonPath = './posts.json';

(async function index() {
  const posts = jsonToPost(await fetcher<JSONPost[]>(jsonPath));

  route(posts);
  window.addEventListener('popstate', () => route(posts));

  defineRouterLink(() => route(posts));
  defineBlogCard(posts);

  activateSearchForm(() => route(posts));
  notifyUpdate();
})();
