import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import markdownItFootnote from 'markdown-it-footnote';
import { format } from 'prettier';
import type { JSONPost } from '../post';

const md = new MarkdownIt();
md.use(markdownItFootnote);

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, '../..');
const jsonPath = path.resolve(rootDir, 'posts.json');
const mdPath = path.resolve(rootDir, 'markdown');

async function listFiles(dir: string): Promise<string[]> {
  const paths = await Promise.all(
    (await readdir(dir, { withFileTypes: true })).map(async (dirent) => {
      if (/^\..*/.test(dirent.name)) return []; // exclude '.icloud' file
      const filePath = path.resolve(dir, dirent.name);
      return dirent.isFile() ? [filePath] : await listFiles(filePath);
    }),
  );
  return paths.flat();
}

async function readPostsMarkdown(paths: string[]): Promise<JSONPost[]> {
  return await Promise.all(
    paths.map(async (path) => {
      const { data, content } = matter(await readFile(path, 'utf-8'));
      return {
        ...data,
        text: md
          .render(content)
          .replace(/\n/g, '')
          .replace(/&gt;/g, '>')
          .replace(/&lt;/g, '<')
          // 漢字《ふりがな》
          .replace(/｜(.+?)《(.+?)》/g, '<ruby>$1<rt>$2</rt></ruby>')
          .replace(/\{(.+?)\|(.+?)\}/g, '<ruby>$1<rt>$2</rt></ruby>')
          .replace(/([一-龠]+)《(.+?)》/g, '<ruby>$1<rt>$2</rt></ruby>'),
      } as JSONPost;
    }),
  );
}

function uniquePosts(posts: JSONPost[]): JSONPost[] {
  return Array.from(
    new Map(posts.map((post) => [post.id, post])).values(),
  ).sort((a, b) => b.id - a.id);
}

async function writePostsJson(
  posts: JSONPost[],
  mdPosts: JSONPost[],
): Promise<JSONPost[]> {
  const newPosts = uniquePosts([...mdPosts, ...posts]);
  await writeFile(
    jsonPath,
    await format(JSON.stringify(newPosts), {
      semi: false,
      parser: 'json',
    }),
  );
  return newPosts;
}

export async function generatePostsJson(): Promise<JSONPost[]> {
  const [mdPaths, postsJson] = await Promise.all([
    listFiles(mdPath),
    readFile(jsonPath, 'utf-8'),
  ]);
  const posts = await writePostsJson(
    JSON.parse(postsJson) as JSONPost[],
    await readPostsMarkdown(mdPaths),
  );
  console.log('posts genarated.');
  return posts;
}


if (path.resolve(process.argv[1] ?? '') === filename) {
  void generatePostsJson();
}
