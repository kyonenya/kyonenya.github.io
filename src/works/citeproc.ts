import CSL, { MetaData } from 'citeproc';
import { Data } from 'csl-json';

export function citeproc({
  data,
  style,
  locale,
}: {
  data: Data[];
  style: string;
  locale: string;
}): string[] {
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

  return bib[1];
}
