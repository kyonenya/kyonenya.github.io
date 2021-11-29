import { renderRoot } from '../render';
import { fetcher } from '../utils';
import { Citation } from './citation';
import { Works } from './Works';

const jsonPath = './works.json';

void (async function index() {
  renderRoot(Works(await fetcher<Citation[]>(jsonPath)));
})();
