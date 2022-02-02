const { createWriteStream, writeFileSync } = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const format = require('xml-formatter');
const posts = require('./posts.json');

const worksLastmod = '2021-11-28';
const aboutLastmod = '2022-02-02';

const sitemap = new SitemapStream({ hostname: 'https://kyonenya.github.io/' });

/**
 * @param {import('./src/post').JSONPost[]} posts
 * @return { {tag: string, modifiedAt: string}[] }
 */
function tagHistory(posts) {
  const tags = [...new Set(posts.map((post) => post.tags).flat())]; // uniq
  return tags.map((tag) => {
    const post = posts.find((post) => post.tags.includes(tag));
    if (!post) return { tag, modifiedAt: '' };
    return { tag, modifiedAt: post.modifiedAt };
  });
}

/**
 * @param {import('./src/post').JSONPost[]} posts
 * @return {void}
 */
function generateSitemap(posts) {
  sitemap.write({ url: '', lastmod: posts[0].modifiedAt });
  sitemap.write({ url: 'works', lastmod: worksLastmod });
  sitemap.write({ url: 'about', lastmod: aboutLastmod });
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
    .then(() => console.log('success!'));
}

generateSitemap(posts);
