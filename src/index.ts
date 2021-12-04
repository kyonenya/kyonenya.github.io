import { registerBlogCard } from './customElements/BlogCard';
import { registerLinkInternal } from './customElements/LinkInternal';
import { notifyUpdate } from './notify';
import { jsonToPost, Post, JSONPost } from './post';
import { route } from './router';
import { activateSearchForm } from './search';
import { fetcher } from './utils';

const jsonPath = './posts.json';

const bootstrap = (posts: Post[]): void => {
  route(posts);
  window.addEventListener('popstate', () => route(posts));

  registerLinkInternal(() => route(posts));
  registerBlogCard(posts);

  activateSearchForm(() => route(posts));
  notifyUpdate();
};

(async function index() {
  const posts = jsonToPost(await fetcher<JSONPost[]>(jsonPath));
  bootstrap(posts);
})();
