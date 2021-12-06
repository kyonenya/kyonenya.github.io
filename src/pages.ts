import { Article } from './Article';
import { PostList, PostListTagged, PostListSearched } from './PostList';
import { Post } from './post';

export type Page = {
  body: string;
  suffix: string;
  description: string;
  title: string;
  archiveHeader: string;
};

export const article = (post: Post): Page => ({
  body: Article(post),
  suffix: ` :: ${post.id}`,
  description: `${post.plainText.substr(0, 110)}…`,
  title: post.title
    ? `${post.title}｜placet experiri :: ${post.id}`
    : `placet experiri :: ${post.id}`,
  archiveHeader: '',
});

export const postList = (posts: Post[]): Page => ({
  body: PostList(posts),
  suffix: '',
  description: '',
  title: 'placet experiri',
  archiveHeader: '',
});

export const postListTagged = (posts: Post[], filteredTag: string): Page => ({
  body: PostListTagged(posts, filteredTag),
  suffix: '',
  description: '',
  title: `#${filteredTag}｜placet experiri`,
  archiveHeader: `#${filteredTag}`,
});

export const postListSearched = (
  posts: Post[],
  keyword: string,
  filteredTag: string | null = null
): Page => ({
  body: PostListSearched(posts, keyword, filteredTag),
  suffix: '',
  description: '',
  title: `「${keyword}」｜placet experiri`,
  archiveHeader: `「${keyword}」`,
});
