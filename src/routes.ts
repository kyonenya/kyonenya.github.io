import { Article } from './Article';
import { PostList, PostListTagged, PostListSearched } from './PostList';
import { Post } from './post';
import { renderPage } from './render';

const article = (post: Post): void => {
  document.querySelector('.el_search_input')?.classList.add('hp_hidden'); // disable search form
  return renderPage({
    body: Article(post),
    suffix: ` :: ${post.id}`,
    description: `${post.plainText.substr(0, 110)}…`,
    title: post.title
      ? `${post.title}｜placet experiri :: ${post.id}`
      : `placet experiri :: ${post.id}`,
    archiveHeader: '',
  });
};

const postList = (posts: Post[]): void =>
  renderPage({
    body: PostList(posts),
    suffix: '',
    description: '',
    title: 'placet experiri',
    archiveHeader: '',
  });

const taggedPostList = (posts: Post[], tag: string): void =>
  renderPage({
    body: PostListTagged(posts, tag),
    suffix: '',
    description: '',
    title: `#${tag}｜placet experiri`,
    archiveHeader: `#${tag}`,
  });

const searchedPostList = (posts: Post[], keyword: string, tag?: string): void =>
  renderPage({
    body: PostListSearched(posts, keyword, tag ?? null),
    suffix: '',
    description: '',
    title: `「${keyword}」｜placet experiri`,
    archiveHeader: `「${keyword}」`,
  });

export const beforeEach = (): void => {
  window.scrollTo(0, 0);
  document.querySelector('.el_search_input')?.classList.remove('hp_hidden');
};

export const routes = {
  article,
  postList,
  taggedPostList,
  searchedPostList,
  beforeEach,
};

type Route = keyof typeof routes;
