import { isPast } from './lib/date-utils';

export type Post = {
  id: number;
  index: number;
  createdAt: Date;
  modifiedAt: Date;
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

function parseDate(dateStr: string): Date {
  if (/\+\d\d/.test(dateStr)) {
    return new Date(dateStr);
  }
  return new Date(`${dateStr}+09:00`); // ja-JP locale
}

export const jsonToPost = (posts: JSONPost[]): Post[] =>
  posts
    .filter((post) => isPast(parseDate(post.createdAt))) // exclude reserved post
    .map((post, i) => ({
      ...post,
      index: i,
      title: post.title === null || post.title === '' ? undefined : post.title,
      text: post.text
        .replaceAll('——', '──') // double dash -> double ruled line
        .replaceAll('　', ' ') // full-width space -> half-width space
        .replaceAll(
          /<a (href='[^?].+?'.*?)>(.+?)<\/a>/g, // overwrite external link
          (_, attributes, linkText) =>
            `<a ${attributes} target='_blank' rel='noopener'>${linkText}</a>`
        )
        .replaceAll(
          /<p>([「『（].+?)<\/p>/g, // unset paragraph indent start with '「'
          (_, text) => `<p style='text-indent: 0'>${text}</p>`
        ),
      plainText: post.text.replaceAll(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
      createdAt: parseDate(post.createdAt + '+09:00'),
      modifiedAt: parseDate(post.modifiedAt),
    }));
