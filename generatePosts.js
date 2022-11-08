const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const MarkdownItFootnote = require('markdown-it-footnote');
const matter = require('gray-matter');

const jsonPath = path.resolve(__dirname, 'posts.json');
const posts = require(jsonPath);

const md = new MarkdownIt();
md.use(MarkdownItFootnote);

const postPath = path.resolve('posts', '41.md');
const post = fs.readFileSync(postPath, 'utf-8');

const postMatter = matter(post);

const html = md.render(postMatter.content).replace(/\n/g, '');

const appendedPost = {
  ...postMatter.data,
  text: html,
};

const newPosts = [appendedPost, ...posts];
const uniquePosts = Array.from(
  new Map(newPosts.map((post) => [post.id, post])).values()
);
//console.log(uniquePosts);

fs.writeFileSync(jsonPath, JSON.stringify(uniquePosts));
