import { renderRoot } from '../render';
import { fetcher } from '../utils';
import { Works } from './Works';
import { Citation } from './citation';

const jsonPath = './works.json';

(async function index() {
  renderRoot(Works(await fetcher<Citation[]>(jsonPath)));
})();
