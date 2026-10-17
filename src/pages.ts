/* shared with ssg.ts: do not touch the DOM */
import { Article } from './Article';
import { PostList, TaggedPostList, SearchedPostList } from './PostList';
import type { Post } from './post';

const baseUrl = 'https://kyonenya.github.io/';

export type Head = {
  title: string;
  description?: string;
  href?: string;
  enableSearchForm: boolean;
};

export type Page = Head & {
  body: string;
  suffix?: string;
};

export const articleHead = (post: Post): Head => ({
  title: post.title
    ? `${post.title}｜placet experiri :: ${post.id}`
    : `placet experiri :: ${post.id}`,
  description: `${post.plainText.substring(0, 110)}…`,
  href: `${baseUrl}posts/${post.id}`,
  enableSearchForm: false,
});

export const articlePage = (post: Post): Page => ({
  body: Article(post),
  suffix: ` :: ${post.id}`,
  ...articleHead(post),
});

export const postListHead: Head = {
  title: 'placet experiri',
  description: '言ってみただけ。哲学と哲学以外のことを書くテキストサイト',
  href: baseUrl,
  enableSearchForm: true,
};

export const postListPage = (posts: Post[]): Page => ({
  body: PostList(posts),
  ...postListHead,
});

export const taggedPostListPage = (posts: Post[], tag: string): Page => ({
  body: TaggedPostList(posts, tag),
  title: `#${tag}｜placet experiri`,
  href: `${baseUrl}?tag=${tag}`,
  enableSearchForm: true,
});

export const searchedPostListPage = (
  posts: Post[],
  keyword: string,
  tag?: string,
): Page => ({
  body: SearchedPostList(posts, keyword, tag),
  title: `「${keyword}」｜placet experiri`,
  enableSearchForm: true,
});
