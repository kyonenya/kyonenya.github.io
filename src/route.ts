import { Article } from './Article';
import { PostList, PostListTagged, PostListSearched } from './PostList';
import { renderPage } from './lib/render';
import { Post } from './post';
import { toState } from './state';

const searchInputElement = document.querySelector('.el_search_input');

const routeMap = {
  article: (post: Post): void => {
    searchInputElement?.classList.add('hp_hidden'); // disable search form
    return renderPage({
      body: Article(post),
      suffix: ` :: ${post.id}`,
      description: `${post.plainText.substr(0, 110)}…`,
      title: post.title
        ? `${post.title}｜placet experiri :: ${post.id}`
        : `placet experiri :: ${post.id}`,
      archiveHeader: '',
    });
  },
  postList: (posts: Post[]): void =>
    renderPage({
      body: PostList(posts),
      suffix: '',
      title: 'placet experiri',
      archiveHeader: '',
    }),
  taggedPostList: (posts: Post[], tag: string): void =>
    renderPage({
      body: PostListTagged(posts, tag),
      suffix: '',
      title: `#${tag}｜placet experiri`,
      archiveHeader: `#${tag}`,
    }),
  searchedPostList: (posts: Post[], keyword: string, tag?: string): void =>
    renderPage({
      body: PostListSearched(posts, keyword, tag),
      suffix: '',
      title: `「${keyword}」｜placet experiri`,
      archiveHeader: `「${keyword}」`,
    }),
  beforeEach: (): void => {
    window.scrollTo(0, 0);
    searchInputElement?.classList.remove('hp_hidden');
  },
};

// export type Route = keyof typeof routes;

export function route(posts: Post[]): void {
  const { id, tag, keyword } = toState(
    window.location.search,
    window.location.hash
  );

  routeMap.beforeEach();

  if (id !== undefined) {
    const post = posts.find((post) => post.id === id);
    if (!post) return; // TODO: 404
    return routeMap.article(post);
  }
  if (keyword !== undefined) {
    return routeMap.searchedPostList(posts, keyword, tag);
  }
  if (tag !== undefined) {
    return routeMap.taggedPostList(posts, tag);
  }
  return routeMap.postList(posts);
}
