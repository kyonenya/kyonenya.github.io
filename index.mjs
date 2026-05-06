import express from 'express';
import { createJiti } from 'jiti';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from './webpack.dev.config.mjs';

const filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(filename);
const jiti = createJiti(import.meta.url);
const { generatePostsJson } = jiti('./src/scripts/postsJson.ts');
const { generateSitemap } = jiti('./src/scripts/sitemap.ts');
const { generateWorksJson } = jiti('./src/scripts/worksJson.ts');
const { generateStaticHtml } = jiti('./src/ssg.ts');

const port = (() => {
  const raw = process.env['WEB_APP_PORT'];
  const parsed = raw === undefined ? 3100 : Number(raw);
  return Number.isNaN(parsed) ? 3100 : parsed;
})();

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
  const posts = await generatePostsJson();
  await Promise.all([
    generateWorksJson(),
    generateSitemap(posts),
    generateStaticHtml(posts),
  ]);
})();
