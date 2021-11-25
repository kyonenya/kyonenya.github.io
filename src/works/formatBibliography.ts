import fs from 'fs';
import CSL, { MetaData } from 'citeproc';

type Bibliography = {
  id: string;
  text: string;
  data: MetaData;
};

export function formatBibliography(
  items: MetaData[],
  style: string,
  locale: string
): Bibliography[] | undefined {
  const sys = {
    retrieveLocale: (_lang: string) => locale,
    retrieveItem: (id: string) => items.find((item) => id === item.id)!,
  };
  const citeproc = new CSL.Engine(sys, style);

  citeproc.setOutputFormat('text');

  citeproc.updateItems(items.map((item) => item.id));
  const bib = citeproc.makeBibliography();
  if (bib === false) return;

  return bib[1].map((text, i) => ({
    id: items[i].id,
    text,
    data: items[i],
  }));
}
