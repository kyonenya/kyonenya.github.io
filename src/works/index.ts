import { Data } from 'csl-json';
import { renderRoot } from '../render';
import { fetcher } from '../utils';
import { Citation } from './bibliography';
import { Works } from './Works';

const jsonPath = './works.json';

async function index() {
  const works = await fetcher<Citation[]>(jsonPath);
  renderRoot(Works(works));
}

index();
