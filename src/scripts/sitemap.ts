import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SitemapStream, streamToPromise } from 'sitemap';
import format from 'xml-formatter';
import type { Update } from '../notify';
import type { JSONPost } from '../post';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, '../..');
const sitemapPaths = [
  path.resolve(rootDir, 'sitemap.xml'),
  path.resolve(rootDir, 'sitemap-resubmit.xml'),
];

function getLatestModifiedAt(posts: JSONPost[]): string | null {
  const latest = Math.max(
    ...posts.map((post) => new Date(post.modifiedAt).getTime()),
  );
  return (
    posts.find((post) => new Date(post.modifiedAt).getTime() === latest)
      ?.modifiedAt ?? null
  );
}

function tagHistory(posts: JSONPost[]): { tag: string; modifiedAt: string }[] {
  const tags = [...new Set(posts.flatMap((post) => post.tags))];
  return tags.map((tag) => ({
    tag,
    modifiedAt:
      getLatestModifiedAt(posts.filter((post) => post.tags.includes(tag))) ??
      '',
  }));
}

export async function generateSitemap(posts: JSONPost[]): Promise<void> {
  const { updatedAt } = JSON.parse(
    await readFile(path.resolve(rootDir, 'about.json'), 'utf8'),
  ) as Update;
  const sitemap = new SitemapStream({
    hostname: 'https://kyonenya.github.io/',
  });

  sitemap.write({ url: '', lastmod: getLatestModifiedAt(posts) ?? '' });
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
  const formattedSitemap = format(sm.toString(), {
    indentation: '  ',
    collapseContent: true,
  });
  await Promise.all(
    sitemapPaths.map((sitemapPath) => writeFile(sitemapPath, formattedSitemap)),
  );
  console.log('sitemap generated.');
}

if (path.resolve(process.argv[1] ?? '') === filename) {
  const posts = JSON.parse(
    await readFile(path.resolve(rootDir, 'posts.json'), 'utf8'),
  ) as JSONPost[];
  void generateSitemap(posts);
}
