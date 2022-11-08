const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const MarkdownItFootnote = require('markdown-it-footnote');
const matter = require('gray-matter');

const md = new MarkdownIt();
md.use(MarkdownItFootnote);

const postPath = path.resolve('posts', '41.md');
const post = fs.readFileSync(postPath, 'utf-8');

const postMatter = matter(post);
console.log(postMatter);

const html = md.render(postMatter.content);
console.log(html);
