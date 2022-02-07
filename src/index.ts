import { defineBlogCard } from './BlogCard';
import { fetcher } from './lib/utils';
import { mediaQueryContextProvider } from './mediaQueryContext';
import { notifyUpdate } from './notify';
import { jsonToPost, JSONPost } from './post';
import { watchPopState, watchSearchForm } from './reroute';
import { route } from './route';

const jsonPath = './posts.json';

function registerRerouters(reroute: () => void): void {
  watchPopState(reroute);
  watchSearchForm(reroute);
  mediaQueryContextProvider(reroute);
}

(async function index() {
  const posts = jsonToPost(await fetcher<JSONPost[]>(jsonPath));
  route(posts);
  registerRerouters(() => route(posts));
  defineBlogCard(posts);
  notifyUpdate();
})();
