import { renderRoot } from '../lib/render';
import { fetcher } from '../lib/utils';
import { Works } from './Works';
import { Citation } from './citation';

const jsonPath = './works.json';

(async function index() {
  renderRoot(Works(await fetcher<Citation[]>(jsonPath)));
})();
