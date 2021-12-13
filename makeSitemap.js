const { createWriteStream, writeFileSync } = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
var format = require('xml-formatter');
const posts = require('./posts.json');

const outputDir = './sitemap2.xml';

const sitemap = new SitemapStream({ hostname: 'https://kyonenya.github.io/' });

sitemap.write({ url: '', lastmod: posts[0].date });
sitemap.write({ url: 'works', lastmod: '2021-12-04' });
sitemap.write({ url: 'about', lastmod: '2021-12-04' });
posts.forEach((post) =>
  sitemap.write({ url: `?id=${post.id}`, lastmod: post.date })
);
sitemap.end();

streamToPromise(sitemap)
  .then((sitemap) =>
    writeFileSync(
      outputDir,
      format(sitemap.toString(), { indentation: '  ', collapseContent: true })
    )
  )
  .then(console.log('success!'));
