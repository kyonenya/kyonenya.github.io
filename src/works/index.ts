import fs from 'fs';
import { MetaData } from 'citeproc';
import { fetcher } from '../utils';
import { formatBibliography } from './formatBibliography';

const jsonPath = '../../works.json';

async function index() {
  const works = await fetcher<MetaData[]>(jsonPath);
  return works;
}

console.log('hi');
index().then((x) => console.log(x));
