import { Article } from './Article';
import { PostList, TaggedPostList, SearchedPostList } from './PostList';
import { renderPage, baseUrl } from './lib/render';
import { isDevelopment } from './lib/utils';
import { Post, excludeReserved } from './post';
import { toState } from './state';

const searchInputElement = document.querySelector('.el_search_input');

const routeMap = {
  article: (post: Post): void => {
    searchInputElement?.classList.add('hp_hidden'); // disable search form
    renderPage({
      body: Article(post),
      title: post.title
        ? `${post.title}｜placet experiri :: ${post.id}`
        : `placet experiri :: ${post.id}`,
      suffix: ` :: ${post.id}`,
      description: `${post.plainText.substring(0, 110)}…`,
      href: `${baseUrl}?id=${post.id}`,
    });
  },
  postList: (posts: Post[]): void =>
    renderPage({
      body: PostList(posts),
      title: 'placet experiri',
      href: baseUrl,
    }),
  taggedPostList: (posts: Post[], tag: string): void =>
    renderPage({
      body: TaggedPostList(posts, tag),
      title: `#${tag}｜placet experiri`,
      href: `${baseUrl}?tag=${tag}`,
    }),
  searchedPostList: (posts: Post[], keyword: string, tag?: string): void =>
    renderPage({
      body: SearchedPostList(posts, keyword, tag),
      title: `「${keyword}」｜placet experiri`,
    }),
  beforeEach: (): void => {
    window.scrollTo(0, 0);
    searchInputElement?.classList.remove('hp_hidden');
  },
  afterEach: (posts: Post[]): void =>
    document
      .querySelectorAll<HTMLAnchorElement>('a[href^="?"]')
      .forEach((a) => {
        a.onclick = (e) => {
          e.preventDefault();
          window.history.pushState(undefined, '', a.href);
          route(posts);
        };
      }),
};

export function route(rawPosts: Post[]): void {
  const { id, tag, keyword } = toState(
    window.location.search,
    window.location.hash
  );
  const posts = isDevelopment(window.location.href)
    ? rawPosts
    : excludeReserved(rawPosts);

  routeMap.beforeEach();

  if (id !== undefined) {
    const post = posts.find((post) => post.id === id);
    if (!post) return; // TODO: 404
    routeMap.article(post);
  } else if (keyword !== undefined) {
    routeMap.searchedPostList(posts, keyword, tag);
  } else if (tag !== undefined) {
    routeMap.taggedPostList(posts, tag);
  } else {
    routeMap.postList(posts);
  }

  return routeMap.afterEach(posts);
}
