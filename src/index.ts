import { defineBlogCard } from './BlogCard';
import { watchPopState, watchSearchForm, notifyUpdate } from './bootstraps';
import { fetcher } from './lib/utils';
import { mediaQueryContextProvider } from './mediaQueryContext';
import { jsonToPost, JSONPost } from './post';
import { route } from './routes';

const jsonPath = './posts.json';

function registerReRoute(reRoute: () => void): void {
  watchPopState(reRoute);
  watchSearchForm(reRoute);
  mediaQueryContextProvider(reRoute);
}

(async function index() {
  const posts = jsonToPost(await fetcher<JSONPost[]>(jsonPath));
  route(posts);
  registerReRoute(() => route(posts));
  defineBlogCard(posts);
  notifyUpdate();
})();
