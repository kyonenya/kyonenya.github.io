import dayjs from './lib/dayjs';

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
  posts
    .filter((post) => dayjs(post.date).isBefore(dayjs())) // exclude reserved post
    .map((post, i) => {
      if (post.id !== posts.length - i) {
        throw new Error('ID should be sequential.');
      }
      return {
        ...post,
        index: i,
        date: dayjs(post.date).toDate(),
        title:
          post.title === null || post.title === '' ? undefined : post.title,
        text: post.text
          .replaceAll('——', '──') // double dash -> double ruled line
          .replaceAll('　', ' '), // full-width space -> half-width space
        plainText: post.text.replaceAll(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
      };
    });
