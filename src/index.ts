import { defineBlogCard } from './customElements/BlogCard';
import { defineLinkInternal } from './customElements/LinkInternal';
import { notifyUpdate } from './notify';
import { jsonToPost, Post, JSONPost } from './post';
import { route } from './router';
import { activateSearchForm } from './search';
import { fetcher } from './utils';

const jsonPath = './posts.json';

const bootstrap = (posts: Post[]): void => {
  route(posts);
  window.addEventListener('popstate', () => route(posts));

  defineLinkInternal(() => route(posts));
  defineBlogCard(posts);

  activateSearchForm(() => route(posts));
  notifyUpdate();
};

(async function index() {
  const posts = jsonToPost(await fetcher<JSONPost[]>(jsonPath));
  bootstrap(posts);
})();
