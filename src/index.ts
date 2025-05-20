import { defineBlogCard } from './BlogCard';
import { fetcher } from './lib/utils';
import { mediaQueryContextProvider } from './mediaQueryContext';
import { notifyUpdate, Update } from './notify';
import { jsonToPost, JSONPost } from './post';
import { watchPopState, watchSearchForm } from './reroute';
import { route } from './route';

const postsPath = './posts.json';
const aboutPath = './about.json';

function registerRerouter(reroute: () => void): void {
  watchPopState(reroute);
  watchSearchForm(reroute);
  mediaQueryContextProvider(reroute);
}

(async function index() {
  const posts = jsonToPost(await fetcher<JSONPost[]>(postsPath));
  route(posts);
  registerRerouter(() => route(posts));
  defineBlogCard(posts);

  const update = await fetcher<Update>(aboutPath);
  notifyUpdate(update);
})();
