import { defineBlogCard } from './BlogCard';
import {
  watchPopState,
  watchSearchForm,
  notifyUpdate,
} from './bootstraps';
import { fetcher } from './lib/utils';
import { jsonToPost, JSONPost } from './post';
import { route } from './routes';
import { watchMediaQuery } from './useMediaQuery';

const jsonPath = './posts.json';

function registerReRouter(reRoute: () => void): void {
  watchPopState(reRoute);
  watchSearchForm(reRoute);
  watchMediaQuery(reRoute);
}

(async function index() {
  const posts = jsonToPost(await fetcher<JSONPost[]>(jsonPath));
  route(posts);
  registerReRouter(() => route(posts));
  defineBlogCard(posts);
  notifyUpdate();
})();
