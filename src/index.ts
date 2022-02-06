import { defineBlogCard } from './BlogCard';
import {
  activatePopState,
  activateSearchForm,
  notifyUpdate,
} from './bootstraps';
import { fetcher } from './lib/utils';
import { jsonToPost, JSONPost } from './post';
import { route } from './routes';
import { activateMediaQuery } from './useMediaQuery';

const jsonPath = './posts.json';

(async function index() {
  const posts = jsonToPost(await fetcher<JSONPost[]>(jsonPath));
  route(posts);
  activatePopState(() => route(posts));
  activateSearchForm(() => route(posts));
  activateMediaQuery(() => route(posts));
  defineBlogCard(posts);
  notifyUpdate();
})();
