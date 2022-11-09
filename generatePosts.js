const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const MarkdownIt = require('markdown-it');
const MarkdownItFootnote = require('markdown-it-footnote');
const matter = require('gray-matter');

const md = new MarkdownIt();
md.use(MarkdownItFootnote);

const jsonPath = path.resolve(__dirname, 'posts.json');
const mdPath = path.resolve(__dirname, 'posts');

/**
 * @param dir string
 * @return string[]
 */
const listFiles = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((dirent) =>
      dirent.isFile()
        ? [`${dir}/${dirent.name}`]
        : listFiles(`${dir}/${dirent.name}`)
    );

/**
 * @param paths string[]
 * @return {import('./src/post').JSONPost[]}
 */
function readPostsMarkdown(paths) {
  return paths
    .map((path) => fs.readFileSync(path, 'utf-8'))
    .map((string) => matter(string))
    .map((matter) => ({
      ...matter.data,
      text: md.replace(/\n/g, '').replace(/&gt;/g, '>').replace(/&lt;/g, '<'),
    }));
}

/**
 * @param posts {import('./src/post').JSONPost[]}
 * @return {import('./src/post').JSONPost[]}
 */
function uniquePosts(posts) {
  const uniquePosts = Array.from(
    new Map(posts.map((post) => [post.id, post])).values()
  );
  return uniquePosts.sort(function (a, b) {
    if (a.id < b.id) return 1;
    if (a.id > b.id) return -1;
    return 0;
  });
}

/**
 * @param posts {import('./src/post').JSONPost[]}
 * @param mdPosts {import('./src/post').JSONPost[]}
 * @return {void}
 */
function writePostsJson(posts, mdPosts) {
  fs.writeFileSync(
    jsonPath,
    prettier.format(JSON.stringify(uniquePosts([...mdPosts, ...posts])), {
      semi: false,
      parser: 'json',
    })
  );
}

/**
 * @return {void}
 */
function generatePosts() {
  writePostsJson(readPostsMarkdown(listFiles(mdPath)), require(jsonPath));
  console.log('success!');
}

generatePosts();
