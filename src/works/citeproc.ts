import fs from 'fs';
import CSL, { MetaData } from 'citeproc';
import { Data } from 'csl-json';

type Bibliography = {
  text: string;
  isTranslation: boolean;
  data: Data;
};

function toBibliography(text: string, item: Data) {
  return {
    text,
    isTranslation: !!item.translator,
    data: item,
  };
}

export function makeBibliography(
  data: Data[],
  style: string,
  locale: string
): Bibliography[] {
  const items = data as MetaData[];
  const sys = {
    retrieveLocale: (_lang: string) => locale,
    retrieveItem: (id: string) => items.find((item) => id === item.id)!,
  };
  const citeproc = new CSL.Engine(sys, style);

  citeproc.setOutputFormat('text');

  citeproc.updateItems(items.map((item) => item.id));
  const bib = citeproc.makeBibliography();
  if (bib === false) return [];

  return bib[1].map((text, i) => toBibliography(text, items[i] as Data));
}
