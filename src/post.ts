import dayjs from './lib/dayjs';

export type Post = {
  id: number;
  index: number;
  createdAt: string;
  modifiedAt: string;
  title: string | undefined;
  text: string;
  plainText: string;
  tags: string[];
};

export type JSONPost = {
  id: number;
  createdAt: string;
  modifiedAt: string;
  title: string | null;
  text: string;
  tags: string[];
};

export const jsonToPost = (posts: JSONPost[]): Post[] =>
  posts
    .filter((post) => dayjs(post.createdAt).isBefore(dayjs())) // exclude reserved post
    .map((post, i) => {
      if (post.id !== posts.length - i) {
        // throw new Error('ID should be sequential.');
      }
      return {
        ...post,
        index: i,
        title:
          post.title === null || post.title === '' ? undefined : post.title,
        text: post.text
          .replaceAll('——', '──') // double dash -> double ruled line
          .replaceAll('　', ' ') // full-width space -> half-width space
          .replaceAll(
            /<a (href='[^?].+?'.*?)>(.+?)<\/a>/g, // overwrite external link
            "<a $1 target='_blank' rel='noopener'>$2</a>"
          ),
        plainText: post.text.replaceAll(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
      };
    });
