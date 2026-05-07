import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore citeproc does not publish TypeScript declarations.
import Citeproc from 'citeproc';
import type { Data as CSLJSON } from 'csl-json';
import { format } from 'prettier';
import type { Citation } from '../works/citation';

type CslEngine = {
  setOutputFormat: (format: 'text') => void;
  updateItems: (ids: string[]) => void;
  makeBibliography: () => false | [unknown, string[]];
};

const CSL = Citeproc as {
  Engine: new (
    sys: {
      retrieveLocale: (lang: string) => string;
      retrieveItem: (
        id: string,
      ) => (Partial<CSLJSON>) | undefined;
    },
    style: string,
  ) => CslEngine;
};

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, '../..');
const worksPath = path.resolve(rootDir, 'works.json');
const citeprocDir = path.resolve(rootDir, 'assets', 'citeproc');
const stylePath = path.resolve(citeprocDir, 'sist02modified.csl');
const localePath = path.resolve(citeprocDir, 'locales-ja-JP.xml');

function removeNullProperties<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null),
  ) as Partial<T>;
}

function citeproc(data: CSLJSON[], style: string, locale: string): string[] {
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

async function appendCitations(items: CSLJSON[]): Promise<Citation[]> {
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

export async function generateWorksJson(): Promise<void> {
  const works = JSON.parse(await readFile(worksPath, 'utf8')) as CSLJSON[];
  const newWorks = await appendCitations(works);
  await writeFile(
    worksPath,
    await format(JSON.stringify(newWorks), {
      semi: false,
      parser: 'json',
    }),
  );
  console.log('works generated.');
}

if (path.resolve(process.argv[1] ?? '') === filename) {
  void generateWorksJson();
}
