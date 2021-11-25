import fs from 'fs';
import { MetaData } from 'citeproc';
import { fetcher, fetchText } from '../utils';
import { formatBibliography } from './formatBibliography';

const jsonPath = '../../works.json';

async function index() {
  const works = await fetcher<MetaData[]>(jsonPath);
  return formatBibliography(
    works,
    await fetchText('https://raw.githubusercontent.com/citation-style-language/styles/master/ieee.csl'),
    await fetchText('https://raw.githubusercontent.com/citation-style-language/locales/master/locales-ja-JP.xml')
  );
}

index().then((x) => console.log(x));
