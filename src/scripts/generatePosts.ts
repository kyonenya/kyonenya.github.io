import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import markdownItFootnote from 'markdown-it-footnote';
import { format } from 'prettier';
import { JSONPost } from '../post';

const md = new MarkdownIt();
md.use(markdownItFootnote);

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, '../..');
const jsonPath = path.resolve(rootDir, 'posts.json');
const mdPath = path.resolve(rootDir, 'markdown');

function listFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
    if (/^\..*/.test(dirent.name)) return []; // exclude '.icloud' file
    const filePath = path.resolve(dir, dirent.name);
    return dirent.isFile() ? [filePath] : listFiles(filePath);
  });
}

function readPostsMarkdown(paths: string[]): JSONPost[] {
  return paths
    .map((path) => readFileSync(path, 'utf-8'))
    .map((string) => matter(string))
    .map(
      (matter) =>
        ({
          ...matter.data,
          text: md
            .render(matter.content)
            .replace(/\n/g, '')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            // 漢字《ふりがな》
            .replace(/｜(.+?)《(.+?)》/g, '<ruby>$1<rt>$2</rt></ruby>')
            .replace(/\{(.+?)\|(.+?)\}/g, '<ruby>$1<rt>$2</rt></ruby>')
            .replace(/([一-龠]+)《(.+?)》/g, '<ruby>$1<rt>$2</rt></ruby>'),
        }) as JSONPost,
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
): Promise<void> {
  writeFileSync(
    jsonPath,
    await format(JSON.stringify(uniquePosts([...mdPosts, ...posts])), {
      semi: false,
      parser: 'json',
    }),
  );
}

export async function generatePosts(): Promise<void> {
  await writePostsJson(
    readPostsMarkdown(listFiles(mdPath)),
    JSON.parse(readFileSync(jsonPath, 'utf-8')) as JSONPost[],
  );
  console.log('posts genarated.');
}

if (path.resolve(process.argv[1] ?? '') === filename) {
  generatePosts().catch((e: unknown) => {
    console.error(e);
    process.exitCode = 1;
  });
}
