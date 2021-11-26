import CSL, { MetaData } from 'citeproc';
import { Data } from 'csl-json';

export function citeproc(props: {
  items: Data[];
  style: string;
  locale: string;
}): string[] {
  const items = props.items as MetaData[];
  const sys = {
    retrieveLocale: (_lang: string) => props.locale,
    retrieveItem: (id: string) => items.find((item) => id === item.id)!,
  };
  const citeproc = new CSL.Engine(sys, props.style);

  citeproc.setOutputFormat('text');

  citeproc.updateItems(items.map((item) => item.id));
  const bib = citeproc.makeBibliography();
  if (bib === false) return [];

  return bib[1].map((text) => text.replace(/\n$/, ''));
}