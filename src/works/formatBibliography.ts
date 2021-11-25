import fs from 'fs';
import CSL, { MetaData } from 'citeproc';

export function formatBibliography(
  items: MetaData[],
  style: string,
  locale: string
) {
  const sys = {
    retrieveLocale: (_lang: string) => locale,
    retrieveItem: (id: string) => items.find((item) => id === item.id)!,
  };
  const citeproc = new CSL.Engine(sys, style);

  citeproc.setOutputFormat('text');

  citeproc.updateItems(items.map((item) => item.id));
  return citeproc.makeBibliography();
}
