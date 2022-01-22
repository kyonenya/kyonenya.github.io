import { defineBlogCard } from './BlogCard';
import {
  activatePopState,
  activateSearchForm,
  notifyUpdate,
} from './bootstraps';
import { fetcher, isDevelopment } from './lib/utils';
import { jsonToPost, JSONPost } from './post';
import { route } from './routes';

const jsonPath = './posts.json';

(async function index() {
  console.log(isDevelopment(window.location.href));
  const posts = jsonToPost(await fetcher<JSONPost[]>(jsonPath));
  route(posts);
  activatePopState(() => route(posts));
  activateSearchForm(() => route(posts));
  defineBlogCard(posts);
  notifyUpdate();
})();
