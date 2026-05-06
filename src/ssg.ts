/* server-side only: do not import client-side code */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { articlePage } from './Article';
import { BlogCard } from './BlogCard';
import { jsonToPosts } from './post';
import type { JSONPost, Post } from './post';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, '..');
const templatePath = path.resolve(rootDir, 'post.template.html');
const distDir = path.resolve(rootDir, 'posts');

function createTemplateValues(post: Post): Record<string, string> {
  const page = articlePage(post, true);
  return {
    PAGE_BODY: page.body,
    PAGE_TITLE: page.title,
    PAGE_SUFFIX: page.suffix ?? '',
    PAGE_DESCRIPTION: page.description ?? '',
    PAGE_HREF: page.href ?? '',
  };
}

function embedTemplate(post: Post, template: string, posts: Post[]): string {
  const values = createTemplateValues(post);
  return template
    .replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
      const value = values[key];
      if (value === undefined) console.log(`Missing template var: ${key}`);
      return value;
    })
    .replace(/<blog-card id='(\d+)'><\/blog-card>/g, (_, id: string) => {
      const post = posts.find((post) => id === post.id.toString());
      if (!post) return '';
      return `<blog-card id='${id}'>${BlogCard(post)}</blog-card>`;
    });
}

export async function generateStaticHtml(jsonPosts: JSONPost[]): Promise<void> {
  const template = await readFile(templatePath, 'utf8');
  const posts = jsonToPosts(jsonPosts);
  await Promise.all(
    posts.map((post) =>
      writeFile(
        path.resolve(distDir, `${post.id}.html`),
        embedTemplate(post, template, posts),
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
