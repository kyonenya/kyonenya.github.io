import fs from 'fs';
import { MetaData } from 'citeproc';
import { fetcher, fetchText } from '../utils';
import { formatBibliography } from './formatBibliography';

const jsonPath = './works.json';
const xmlPath = './src/works/locales-ja-JP.xml';
const stylePath = './src/works/sist02modified.csl';

async function index() {
  const works = await fetcher<MetaData[]>(jsonPath);
  return formatBibliography(
    works,
    await fetchText(stylePath),
    await fetchText(xmlPath)
  );
}

index().then((x) => console.log(x));
