import fs from 'fs';
import { Data } from 'csl-json';
import { fetcher, fetchText } from '../utils';
import { makeBibliography } from './citeproc';

const jsonPath = './works.json';
const xmlPath = './src/works/locales-ja-JP.xml';
const stylePath = './src/works/sist02modified.csl';

async function index() {
  const works = await fetcher<Data[]>(jsonPath);
  return makeBibliography(
    works,
    await fetchText(stylePath),
    await fetchText(xmlPath)
  );
}

index().then((x) => console.log(x));
