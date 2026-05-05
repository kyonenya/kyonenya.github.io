/* server-side only: do not import client-side code */
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { articlePage } from './Article';
import { BlogCard } from './BlogCard';
import { jsonToPosts, Post } from './post';

const templatePath = path.resolve(__dirname, '..', 'post.template.html');
const jsonPath = path.resolve(__dirname, '..', 'posts.json');
const distPath = path.resolve(__dirname, '..', 'posts');

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

export function generateStaticHTML(): void {
  const template = readFileSync(templatePath, 'utf8');
  const posts = jsonToPosts(JSON.parse(readFileSync(jsonPath, 'utf8')));
  posts.forEach((post) =>
    writeFileSync(
      path.resolve(distPath, `${post.id}.html`),
      embedTemplate(post, template, posts),
      'utf8'
    )
  );
  console.log('static html generated.');
}
