import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Data } from 'csl-json';
import { format } from 'prettier';
import type { Citation } from '../works/citation';

type CslEngine = {
  setOutputFormat: (format: 'text') => void;
  updateItems: (ids: string[]) => void;
  makeBibliography: () => false | [unknown, string[]];
};

type Csl = {
  Engine: new (
    sys: {
      retrieveLocale: (lang: string) => string;
      retrieveItem: (
        id: string,
      ) => (Partial<Data> & { id: string }) | undefined;
    },
    style: string,
  ) => CslEngine;
};

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const require = createRequire(import.meta.url);
const CSL = require('citeproc') as Csl;
const rootDir = path.resolve(dirname, '../..');
const worksPath = path.resolve(rootDir, 'works.json');
const stylePath = path.resolve(
  rootDir,
  'assets',
  'citeproc',
  'sist02modified.csl',
);
const localePath = path.resolve(
  rootDir,
  'assets',
  'citeproc',
  'locales-ja-JP.xml',
);

function removeNullProperties<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null),
  ) as Partial<T>;
}

function citeproc(data: Data[], style: string, locale: string): string[] {
  const items = data.map((item) => ({
    ...removeNullProperties(item),
    id: item.id.toString(),
  }));
  const sys = {
    retrieveLocale: () => locale,
    retrieveItem: (id: string) => items.find((item) => id === item.id),
  };
  const citeproc = new CSL.Engine(sys, style);
  citeproc.setOutputFormat('text');

  citeproc.updateItems(items.map((item) => item.id));
  const bib = citeproc.makeBibliography();
  if (bib === false) return [];

  return bib[1].map((text) => text.replace(/\n$/, ''));
}

async function appendBibliography(items: Data[]): Promise<Citation[]> {
  const [style, locale] = await Promise.all([
    readFile(stylePath, 'utf-8'),
    readFile(localePath, 'utf-8'),
  ]);
  const bibTexts = citeproc(items, style, locale);
  return items.map((item, i) => ({
    ...item,
    _bibliographyText: bibTexts[i],
  }));
}

export async function generateWorks(): Promise<void> {
  const works = JSON.parse(await readFile(worksPath, 'utf8')) as Data[];
  const newWorks = await appendBibliography(works);
  await writeFile(
    worksPath,
    await format(JSON.stringify(newWorks), {
      semi: false,
      parser: 'json',
    }),
  );
  console.log('works generated.');
}

async function main(): Promise<void> {
  try {
    await generateWorks();
  } catch (e) {
    console.error(e);
    process.exitCode = 1;
  }
}

if (path.resolve(process.argv[1] ?? '') === filename) {
  void main();
}
