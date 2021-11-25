import { Data } from 'csl-json';
import { fetcher, fetchText } from '../utils';
import { citeproc } from './citeproc';
import { Bibliography, toBibliographies } from './bibliography';
import { render } from './page';

const jsonPath = './works.json';
const xmlPath = './src/works/locales-ja-JP.xml';
const stylePath = './src/works/sist02modified.csl';

async function index() {
  const works = await fetcher<Data[]>(jsonPath);
  const texts = citeproc({
    data: works,
    style: await fetchText(stylePath),
    locale: await fetchText(xmlPath),
  });
  const bibliographies = toBibliographies(texts, works);
  render(bibliographies);
  return bibliographies;
}

index().then((x) => console.log(x));
