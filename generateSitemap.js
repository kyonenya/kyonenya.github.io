const { createWriteStream, writeFileSync } = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const format = require('xml-formatter');
const posts = require('./posts.json');

const worksLastmod = '2021-11-28';
const aboutLastmod = '2021-11-28';

const sitemap = new SitemapStream({ hostname: 'https://kyonenya.github.io/' });

sitemap.write({ url: '', lastmod: posts[0].modifiedAt });
sitemap.write({ url: 'works', lastmod: worksLastmod });
sitemap.write({ url: 'about', lastmod: aboutLastmod });
posts.forEach((post) =>
  sitemap.write({ url: `?id=${post.id}`, lastmod: post.modifiedAt })
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
