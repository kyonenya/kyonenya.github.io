const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.dev.config.js');
const { createJiti } = require('jiti');
const jiti = createJiti(__filename);
const { generatePostsJson } = jiti('./src/scripts/generatePostsJson.ts');
const { generateSitemap } = jiti('./src/scripts/generateSitemap.ts');
const { generateWorks } = jiti('./src/scripts/generateWorks.ts');
const { generateStaticHTML } = jiti('./src/ssg.ts');

const rootDir = __dirname;
const port = process.env['WEB_APP_PORT'] ?? 3100;

express()
  .use(webpackDevMiddleware(webpack(config)))
  .get('/', (req, res) => res.sendFile(path.resolve(rootDir, 'index.html')))
  .get('/posts/:id', (req, res) => {
    if (!/^\d+$/.test(req.params.id)) return res.status(404).end();
    res.sendFile(path.resolve(rootDir, 'posts', `${req.params.id}.html`));
  })
  .get('/works', (req, res) =>
    res.sendFile(path.resolve(rootDir, 'works.html')),
  )
  .get('/about', (req, res) =>
    res.sendFile(path.resolve(rootDir, 'about.html')),
  )
  // redirect production -> development
  .get('/dist/:scriptName', (req, res) =>
    res.redirect(`/dist/dev/${req.params.scriptName}`),
  )
  .get('/dist/css/bundle.css', (req, res) => res.redirect('/src/css/index.css'))
  .use(express.static(rootDir))
  .listen(port, () =>
    console.log(`Launching app... http://localhost:${port}\n`),
  );

(async () => {
  try {
    const posts = await generatePostsJson();
    await Promise.all([
      generateWorks(),
      generateSitemap(posts),
      generateStaticHTML(posts),
    ]);
  } catch (e) {
    console.error(e);
  }
})();
