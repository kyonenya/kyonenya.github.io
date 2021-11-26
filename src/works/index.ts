import { Data } from 'csl-json';
import { fetcher, fetchText } from '../utils';
import { citeproc } from './citeproc';
import { toBibliographyMap } from './bibliography';
import { render } from './page';

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
  const bibs = toBibliographyMap(texts, works);
  console.log(bibs.get('論文'));
  console.log(bibs.get('発表'));
  //  render(bibs);
}

index().catch((e) => console.error(e));
