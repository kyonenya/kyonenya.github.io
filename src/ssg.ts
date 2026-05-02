import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Article } from './Article';
import { jsonToPost, JSONPost } from './post';

const templatePath = path.resolve(__dirname, '..', 'post.template.html');
const jsonPath = path.resolve(__dirname, '..', 'posts.json');
const distPath = path.resolve(__dirname, '..', 'posts');

type TemplateValues = Record<string, string>;

function createTemplateValues(post: JSONPost): TemplateValues {
  return {
    POST_BODY: Article(jsonToPost(post)),
    POST_TITLE: post.title ?? '',
  };
}

function embedTemplate(template: string, values: TemplateValues): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => {
    const value = values[key];

    if (value === undefined) {
      //      throw new Error(`Missing template var: ${key}`);
    }

    return value;
  });
}

function readPosts(): JSONPost[] {
  const json = readFileSync(jsonPath, 'utf8');
  return JSON.parse(json) as JSONPost[];
}

function writePostHTML(post: JSONPost, template: string): void {
  const html = embedTemplate(template, createTemplateValues(post));

  writeFileSync(path.resolve(distPath, `${post.id}.html`), html, 'utf8');
}

function writePostsHTML(posts: JSONPost[], template: string): void {
  posts.forEach((post) => writePostHTML(post, template));
}

export async function generateStaticHTML(): Promise<void> {
  const [template, posts] = await Promise.all([
    readFileSync(templatePath, 'utf8'),
    readPosts(),
  ]);

  writePostsHTML(posts, template);

  console.log('static html generated.');
}

generateStaticHTML().catch((error: unknown) => {
  console.error(error);
});
