import { toDate } from './utils';

export type Post = {
  id: number;
  index: number;
  date: Date;
  title: string | undefined;
  text: string;
  plainText: string;
  tags: string[];
};

export type JSONPost = {
  id: number;
  date: string;
  title: string | null;
  text: string;
  tags: string[];
};

export const jsonToPost = (posts: JSONPost[]): Post[] =>
  posts.map((post, i) => {
    if (post.id !== posts.length - i) {
      throw new Error('Post id should be sequential.');
    }
    return {
      ...post,
      index: i,
      date: toDate(post.date),
      title: post.title === null || post.title === '' ? undefined : post.title,
      text: post.text
        .replace(/——/g, '──') // double dash -> double ruled line
        .replace(/　/g, ' '), // full-width space -> half-width space
      plainText: post.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
    };
  });
