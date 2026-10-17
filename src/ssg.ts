/* server-side only: do not import client-side code */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BlogCard } from './BlogCard';
import { articlePage, postListPage, type Page } from './pages';
import { excludeReserved, jsonToPosts } from './post';
import type { JSONPost, Post } from './post';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, '..');
const templatePath = path.resolve(rootDir, 'template.html');

function embedTemplate(
  template: string,
  page: Page,
  rootPath: string,
  posts: Post[],
): string {
  const values: Record<string, string> = {
    ROOT_PATH: rootPath,
    PAGE_BODY: page.body,
    PAGE_TITLE: page.title,
    PAGE_SUFFIX: page.suffix ?? '',
    PAGE_DESCRIPTION: page.description ?? '',
    PAGE_HREF: page.href ?? '',
    SEARCH_DISPLAY: page.disableSearchForm ? 'none' : 'block',
  };
  return template
    .replaceAll(/\{\{(\w+)\}\}/g, (_, key: string) => {
      const value = values[key];
      if (value === undefined) console.log(`Missing template var: ${key}`);
      return value;
    })
    .replaceAll(/<blog-card id='(\d+)'><\/blog-card>/g, (_, id: string) => {
      const post = posts.find((post) => id === post.id.toString());
      if (!post) return '';
      return `<blog-card id='${id}'>${BlogCard(post)}</blog-card>`;
    });
}

export async function generateStaticHtml(jsonPosts: JSONPost[]): Promise<void> {
  const template = await readFile(templatePath, 'utf8');
  const posts = jsonToPosts(jsonPosts);
  await Promise.all(
    [
      {
        file: 'index.html',
        rootPath: '.',
        page: postListPage(excludeReserved(posts)),
      },
      ...posts.map((post) => ({
        file: `posts/${post.id}.html`,
        rootPath: '..',
        page: articlePage(post),
      })),
    ].map(({ file, rootPath, page }) =>
      writeFile(
        path.resolve(rootDir, file),
        embedTemplate(template, page, rootPath, posts),
        'utf8',
      ),
    ),
  );
  console.log('static html generated.');
}

if (path.resolve(process.argv[1] ?? '') === filename) {
  const posts = JSON.parse(
    await readFile(path.resolve(rootDir, 'posts.json'), 'utf8'),
  ) as JSONPost[];
  void generateStaticHtml(posts);
}
