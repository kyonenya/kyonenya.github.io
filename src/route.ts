import { articlePage } from './Article';
import { PostList, TaggedPostList, SearchedPostList } from './PostList';
import { isDevelopment } from './lib/utils';
import { Post, excludeReserved } from './post';
import { renderPage, baseUrl } from './render';
import { toState } from './state';

const searchInputElement =
  document.querySelector<HTMLInputElement>('.el_search_input');

const routeMap = {
  article: (post: Post): void => {
    renderPage(articlePage(post));
    // disable search form
    if (searchInputElement) searchInputElement.style.display = 'none';
  },
  postList: (posts: Post[]): void => {
    renderPage({
      body: PostList(posts),
      title: 'placet experiri',
      href: baseUrl,
    });
    if (searchInputElement) searchInputElement.style.display = 'block';
  },
  taggedPostList: (posts: Post[], tag: string): void => {
    renderPage({
      body: TaggedPostList(posts, tag),
      title: `#${tag}｜placet experiri`,
      href: `${baseUrl}?tag=${tag}`,
    });
    if (searchInputElement) searchInputElement.style.display = 'block';
  },
  searchedPostList: (posts: Post[], keyword: string, tag?: string): void => {
    renderPage({
      body: SearchedPostList(posts, keyword, tag),
      title: `「${keyword}」｜placet experiri`,
    });
    if (searchInputElement) searchInputElement.style.display = 'block';
  },
  beforeEach: (legacyId: number | undefined): void => {
    if (legacyId) {
      // for backward compatibility
      window.history.replaceState(undefined, '', `/posts/${legacyId}`);
    }
  },
};

export function route(rawPosts: Post[]): void {
  const { id, legacyId, tag, keyword } = toState(
    window.location.search,
    window.location.pathname,
    window.location.hash,
  );

  const posts = isDevelopment(window.location.href)
    ? rawPosts
    : excludeReserved(rawPosts);

  routeMap.beforeEach(legacyId);

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
}
