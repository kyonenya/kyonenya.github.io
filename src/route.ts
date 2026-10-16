import { articlePage } from './Article';
import { PostList, TaggedPostList, SearchedPostList } from './PostList';
import { isDevelopment } from './lib/utils';
import { excludeReserved, type Post } from './post';
import { renderPage, renderHead, baseUrl } from './render';
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
  ssgPostList: (): void => {
    renderHead({ title: 'placet experiri', href: baseUrl });
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
};

export function route(rawPosts: Post[], isInitial = false): void {
  const { id, tag, keyword } = toState(
    window.location.search,
    window.location.pathname,
    window.location.hash,
  );

  const posts = isDevelopment(window.location.href)
    ? rawPosts
    : excludeReserved(rawPosts);

  if (id !== null) {
    const post = posts.find((post) => post.id === id);
    if (!post) return; // TODO: 404
    routeMap.article(post);
  } else if (keyword !== null) {
    routeMap.searchedPostList(posts, keyword, tag ?? undefined);
  } else if (tag !== null) {
    routeMap.taggedPostList(posts, tag);
  } else if (
    isInitial &&
    document.querySelectorAll('.bl_postList_item').length === posts.length
  ) {
    routeMap.ssgPostList(); // reuse SSG list as is
  } else {
    routeMap.postList(posts);
  }
}
