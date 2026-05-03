import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { BlogCard } from './BlogCard';
import { jsonToPosts, JSONPost, Post } from './post';
//import { articlePage } from './route';
import { Article, articlePage } from './Article';

const templatePath = path.resolve(__dirname, '..', 'post.template.html');
const jsonPath = path.resolve(__dirname, '..', 'posts.json');
const distPath = path.resolve(__dirname, '..', 'posts');

type TemplateValues = Record<string, string>;

function createTemplateValues(post: Post): TemplateValues {
  const page = articlePage(post);
  return {
    PAGE_BODY: page.body,
    PAGE_TITLE: page.title,
    PAGE_SUFFIX: page.suffix,
    PAGE_DESCRIPTION: page.description,
    PAGE_HREF: page.href,
  };
}

function embedTemplate(template: string, values: TemplateValues): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = values[key];

    if (!value) {
      console.log(`Missing template var: ${key}`);
    }

    return value;
  });
}

function writePostHTML(post: Post, template: string, posts: Post[]): void {
  const html = embedTemplate(template, createTemplateValues(post));
  const html2 = html.replace(
    /<blog-card id='(\d+)'><\/blog-card>/g,
    (_, id: string) => {
      const post = posts.filter((post) => id === post.id.toString())[0];
      if (!post) return '';
      return BlogCard(post);
    }
  );

  writeFileSync(path.resolve(distPath, `${post.id}.html`), html2, 'utf8');
}

function writePostsHTML(posts: Post[], template: string): void {
  posts.forEach((post) => writePostHTML(post, template, posts));
}

export function generateStaticHTML(): void {
  const template = readFileSync(templatePath, 'utf8');
  const posts = JSON.parse(readFileSync(jsonPath, 'utf8')) as JSONPost[];
  writePostsHTML(jsonToPosts(posts), template);

  console.log('static html generated.');
}

generateStaticHTML();
