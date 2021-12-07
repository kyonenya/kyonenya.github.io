import { Article } from './Article';
import { PostList, PostListTagged, PostListSearched } from './PostList';
import { Post } from './post';
import { render } from './render';

const article = (post: Post): void => {
  document.querySelector('.el_search_input')?.classList.add('hp_hidden'); // disable search form
  return render({
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
  render({
    body: PostList(posts),
    suffix: '',
    description: '',
    title: 'placet experiri',
    archiveHeader: '',
  });

const taggedPostList = (posts: Post[], tag: string): void =>
  render({
    body: PostListTagged(posts, tag),
    suffix: '',
    description: '',
    title: `#${tag}｜placet experiri`,
    archiveHeader: `#${tag}`,
  });

const searchedPostList = (posts: Post[], keyword: string, tag?: string): void =>
  render({
    body: PostListSearched(posts, keyword, tag ?? null),
    suffix: '',
    description: '',
    title: `「${keyword}」｜placet experiri`,
    archiveHeader: `「${keyword}」`,
  });

export const routes = {
  article,
  postList,
  taggedPostList,
  searchedPostList,
};
