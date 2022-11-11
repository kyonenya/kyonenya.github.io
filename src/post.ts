import { isPast } from './lib/dateUtils';

export type Post = {
  id: number;
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

export function jsonToPost(posts: JSONPost[]): Post[] {
  return [...posts].reverse().map((post) => ({
    ...post,
    title: post.title === null || post.title === '' ? undefined : post.title,
    plainText: post.text
      .replaceAll(
        /<blockquote>(.+?)<\/blockquote>/g,
        (_, text: string) => `> ${text}`
      )
      .replaceAll(
        /<h2>(.+?)<\/h2>/g,
        (_, text: string) => `## ${text}`
      )
      .replaceAll(/——/g, '──')
      .replaceAll(/<("[^"]*"|'[^']*'|[^'">])*>/g, ''),
    createdAt: parseDate(post.createdAt),
    modifiedAt: parseDate(post.modifiedAt),
  }));
}

export function excludeReserved(posts: Post[]): Post[] {
  return posts.filter((post) => isPast(post.createdAt));
}
