const { createWriteStream, writeFileSync } = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const format = require('xml-formatter');
const { updatedAt } = require('./about.json');

const sitemap = new SitemapStream({ hostname: 'https://kyonenya.github.io/' });

/**
 * @param {import('./src/post').JSONPost[]} posts
 * @return {string}
 */
function getLatestModifiedAt(posts) {
  return posts
    .map((post) => post.modifiedAt)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];
}

/**
 * @param {import('./src/post').JSONPost[]} posts
 * @return { {tag: string, modifiedAt: string}[] }
 */
function tagHistory(posts) {
  const tags = [...new Set(posts.map((post) => post.tags).flat())]; // uniq
  return tags.map((tag) => {
    return {
      tag,
      modifiedAt: getLatestModifiedAt(
        posts.filter((post) => post.tags.includes(tag))
      ),
    };
  });
}

/**
 * @param {import('./src/post').JSONPost[]} posts
 * @return {void}
 */
function generateSitemap(posts) {
  sitemap.write({ url: '', lastmod: getLatestModifiedAt(posts) });
  sitemap.write({ url: 'works', lastmod: updatedAt });
  sitemap.write({ url: 'about', lastmod: updatedAt });
  posts.forEach((post) =>
    sitemap.write({ url: `?id=${post.id}`, lastmod: post.modifiedAt })
  );
  tagHistory(posts).forEach(({ tag, modifiedAt }) =>
    sitemap.write({ url: `?tag=${tag}`, lastmod: modifiedAt })
  );
  sitemap.end();

  streamToPromise(sitemap)
    .then((sm) =>
      writeFileSync(
        './sitemap.xml',
        format(sm.toString(), { indentation: '  ', collapseContent: true })
      )
    )
    .then(() => console.log('sitemap generated.'));
}

module.exports = generateSitemap;

if (require.main === module) {
  const posts = require('./posts.json');
  generateSitemap(posts);
}
