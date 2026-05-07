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
  const dirents = await readdir(dir, { withFileTypes: true });
  const paths = await Promise.all(
    dirents.map(async (dirent) => {
      if (/^\..*/.test(dirent.name)) return []; // exclude '.icloud' file
      const filePath = path.resolve(dir, dirent.name);
      if (dirent.isFile()) return [filePath];
      return await listFiles(filePath);
    }),
  );
  return paths.flat();
}

function replacePostHtml(html: string): string {
  return (
    html
      .replace(/\n/g, '')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      // 漢字《ふりがな》
      .replace(/｜(.+?)《(.+?)》/g, '<ruby>$1<rt>$2</rt></ruby>')
      .replace(/\{(.+?)\|(.+?)\}/g, '<ruby>$1<rt>$2</rt></ruby>')
      .replace(/([一-龠]+)《(.+?)》/g, '<ruby>$1<rt>$2</rt></ruby>')
  );
}

async function readPostsMarkdown(paths: string[]): Promise<JSONPost[]> {
  return await Promise.all(
    paths.map(async (filePath) => {
      const { data, content } = matter(await readFile(filePath, 'utf-8'));
      return {
        ...data,
        text: replacePostHtml(md.render(content)),
      } as JSONPost;
    }),
  );
}

function uniquePosts(posts: JSONPost[]): JSONPost[] {
  return Array.from(
    new Map(posts.map((post) => [post.id, post])).values(),
  ).sort((a, b) => b.id - a.id);
}

export async function generatePostsJson(): Promise<JSONPost[]> {
  const [mdPaths, postsJson] = await Promise.all([
    listFiles(mdPath),
    readFile(jsonPath, 'utf-8'),
  ]);
  const jsonPosts = JSON.parse(postsJson) as JSONPost[];
  const mdPosts = await readPostsMarkdown(mdPaths);
  const newPosts = uniquePosts([...jsonPosts, ...mdPosts]); // mdPosts > jsonPosts
  await writeFile(
    jsonPath,
    await format(JSON.stringify(newPosts), { parser: 'json' }),
  );
  console.log('posts generated.');

  return newPosts;
}

if (path.resolve(process.argv[1] ?? '') === filename) {
  void generatePostsJson();
}
