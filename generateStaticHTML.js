const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const templatePath = path.resolve(__dirname, 'post.template.html');
const jsonPath = path.resolve(__dirname, 'posts.json');
const distPath = path.resolve(__dirname, 'posts');

function valuesMap(post) {
  return {
    POST_BODY: post.text,
    POST_TITLE: post.title,
  };
}

/**
 * @param template string
 * @param valuesMap Record<string, string>
 * @return string
 */
function embeddedTemplate(template, valuesMap) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    //    if (!(key in valuesMap)) throw new Error(`Missing template var: ${key}`)
    return valuesMap[key];
  });
}

/**
 * @param posts {import('./src/post').JSONPost[]}
 * @return {void}
 */
function writePostsHTML(posts, template) {
  posts.forEach((post) => {
    fs.writeFileSync(
      path.resolve(__dirname, 'posts', `${post.id}.html`),
      embeddedTemplate(template, valuesMap(post))
    );
  });
}

/**
 * @return {void}
 */
function generateSたちtaticHTML() {
  writePostsHTML(require(jsonPath), fs.readFileSync(templatePath, 'utf-8'));
  console.log('static html genarated.');
}

module.exports = generateSたちtaticHTML;

if (require.main === module) {
  generateSたちtaticHTML();
}
