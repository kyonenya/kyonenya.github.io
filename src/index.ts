import { defineBlogCard } from './BlogCard';
import { defineLinks } from './Link';
import { activateSearchForm, notifyUpdate } from './bootstraps';
import { fetcher } from './lib/utils';
import { jsonToPost, JSONPost } from './post';
import { route } from './route';

const jsonPath = './posts.json';

(async function index() {
  const posts = jsonToPost(await fetcher<JSONPost[]>(jsonPath));

  route(posts);
  window.addEventListener('popstate', () => route(posts));

  defineLinks(() => route(posts));
  defineBlogCard(posts);

  activateSearchForm(() => route(posts));
  notifyUpdate();
})();
