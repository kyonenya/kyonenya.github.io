const fs = require('fs');
const path = require('path');
const CSL = require('citeproc');
const prettier = require('prettier');

const worksPath = path.resolve('works.json');
const stylePath = path.resolve('assets', 'citeproc', 'sist02modified.csl');
const localePath = path.resolve('assets', 'citeproc', 'locales-ja-JP.xml');

/**
 * @param {object} obj
 * @return {object}
 */
function removeNullProperties(obj) {
  return Object.entries(obj)
    .filter(([_k, v]) => v !== null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}

/**
 * @param {import('csl-json').Data[]} data
 * @param {string} style
 * @param {string} locale
 * @return {string[]}
 */
function citeproc(data, style, locale) {
  const items = data.map((item) => ({
    ...removeNullProperties(item),
    id: item.id.toString(),
  }));
  const sys = {
    retrieveLocale: (_lang) => locale,
    retrieveItem: (id) => items.find((item) => id === item.id),
  };
  const citeproc = new CSL.Engine(sys, style);
  citeproc.setOutputFormat('text');

  citeproc.updateItems(items.map((item) => item.id));
  const bib = citeproc.makeBibliography();
  if (bib === false) return [];

  return bib[1].map((text) => text.replace(/\n$/, ''));
}

/**
 * @param {import('csl-json').Data[]} items
 * @return {import('./src/works/citation').Citation[]}
 */
function AppendBibliopraphy(items) {
  const bibTexts = citeproc(
    items,
    fs.readFileSync(stylePath, 'utf-8'),
    fs.readFileSync(localePath, 'utf-8')
  );
  return items.map((item, i) => ({
    ...item,
    _bibliographyText: bibTexts[i],
  }));
}

/**
 * @return {void}
 */
function generateBibliography() {
  const works = JSON.parse(fs.readFileSync(worksPath, 'utf8'));
  const newWorks = AppendBibliopraphy(works);
  fs.writeFileSync(
    worksPath,
    prettier.format(JSON.stringify(newWorks), {
      semi: false,
      parser: 'json',
    })
  );
  console.log('bibliography generated.');
}

module.exports = generateBibliography;

if (require.main === module) {
  generateBibliography();
}
