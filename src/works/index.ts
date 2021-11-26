import { Data } from 'csl-json';
import { renderRoot } from '../render';
import { fetcher, fetchText } from '../utils';
import { citeproc } from './citeproc';
import { toBibliographyMap } from './bibliography';
import { Works } from './Works';

const jsonPath = './works.json';
const xmlPath = './src/works/locales-ja-JP.xml';
const stylePath = './src/works/sist02modified.csl';

async function index() {
  const works = await fetcher<Data[]>(jsonPath);
  const texts = citeproc({
    items: works,
    style: await fetchText(stylePath),
    locale: await fetchText(xmlPath),
  });
  const bibMap = toBibliographyMap(texts, works);
  renderRoot(Works(bibMap));
}

index().catch((e) => console.error(e));
