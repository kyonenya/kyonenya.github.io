import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SitemapStream, streamToPromise } from 'sitemap';
import format from 'xml-formatter';
import { Update } from '../notify';
import { JSONPost } from '../post';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, '../..');
const sitemapPath = path.resolve(rootDir, 'sitemap.xml');

function getLatestModifiedAt(posts: JSONPost[]): string {
  return (
    posts
      .map((post) => post.modifiedAt)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] ?? ''
  );
}

function tagHistory(posts: JSONPost[]): { tag: string; modifiedAt: string }[] {
  const tags = [...new Set(posts.flatMap((post) => post.tags))];
  return tags.map((tag) => ({
    tag,
    modifiedAt: getLatestModifiedAt(
      posts.filter((post) => post.tags.includes(tag)),
    ),
  }));
}

export async function generateSitemap(posts: JSONPost[]): Promise<void> {
  const { updatedAt } = JSON.parse(
    readFileSync(path.resolve(rootDir, 'about.json'), 'utf8'),
  ) as Update;
  const sitemap = new SitemapStream({
    hostname: 'https://kyonenya.github.io/',
  });

  sitemap.write({ url: '', lastmod: getLatestModifiedAt(posts) });
  sitemap.write({ url: 'works', lastmod: updatedAt });
  sitemap.write({ url: 'about', lastmod: updatedAt });
  posts.forEach((post) =>
    sitemap.write({ url: `/posts/${post.id}`, lastmod: post.modifiedAt }),
  );
  tagHistory(posts).forEach(({ tag, modifiedAt }) =>
    sitemap.write({ url: `?tag=${tag}`, lastmod: modifiedAt }),
  );
  sitemap.end();

  const sm = await streamToPromise(sitemap);
  writeFileSync(
    sitemapPath,
    format(sm.toString(), { indentation: '  ', collapseContent: true }),
  );
  console.log('sitemap generated.');
}

if (path.resolve(process.argv[1] ?? '') === filename) {
  const posts = JSON.parse(
    readFileSync(path.resolve(rootDir, 'posts.json'), 'utf8'),
  ) as JSONPost[];
  generateSitemap(posts).catch((e: unknown) => {
    console.error(e);
    process.exitCode = 1;
  });
}
