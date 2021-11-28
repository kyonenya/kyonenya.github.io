import { Data } from 'csl-json';
import { renderRoot } from '../render';
import { fetcher } from '../utils';
import { citeproc } from './citeproc';
import { toBibliographyMap } from './bibliography';
import { Works } from './Works';
import style from './sist02modified.csl';
import locale from './locales-ja-JP.xml';

const jsonPath = './works.json';

async function index() {
  const works = await fetcher<Data[]>(jsonPath);
  const texts = citeproc({
    items: works,
    style,
    locale,
  });
  const bibMap = toBibliographyMap(texts, works);
  renderRoot(Works(bibMap));
}

index().catch((e) => console.error(e));
