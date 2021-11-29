const fs = require('fs');
const path = require('path');
const CSL = require('citeproc');

const worksPath = path.resolve('works.json');
const stylePath = path.resolve('assets', 'citeproc', 'sist02modified.csl');
const localePath = path.resolve('assets', 'citeproc', 'locales-ja-JP.xml');

/** @url https://stackoverflow.com/questions/286141/remove-blank-attributes-from-an-object-in-javascript */
function removeNull(obj) {
  return Object.entries(obj)
    .filter(([_, v]) => v !== null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
}

function citeproc(data, style, locale) {
  const items = data.map((item) => ({
    ...removeNull(item),
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

function makeBibliography() {
  const works = JSON.parse(fs.readFileSync(worksPath, 'utf8'));
  const newWorks = AppendBibliopraphy(works);
  fs.writeFileSync(worksPath, JSON.stringify(newWorks));
  console.log('success!');
}

makeBibliography();
