import { jsonToPost, Post, JSONPost } from './post';
import { route } from './router';
import { activateSearchForm } from './search';
import { registerBlogCard } from './BlogCard';
import { registerLinkInternal } from './LinkInternal';
import { fetcher } from './utils';
import { notifyUpdate } from './notify';

const jsonPath = './posts.json';

const bootstrap = (posts: Post[]): void => {
  route(posts);
  window.addEventListener('popstate', () => route(posts));

  registerLinkInternal(() => route(posts));
  registerBlogCard(posts);

  activateSearchForm(() => route(posts));
  notifyUpdate();
};

void (async function index() {
  const rawData = await fetcher<JSONPost[]>(jsonPath);
  const posts = jsonToPost(rawData);
  bootstrap(posts);
})();
