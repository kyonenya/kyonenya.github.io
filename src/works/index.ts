import { renderRoot } from '../lib/render';
import { fetcher } from '../lib/utils';
import { notifyUpdate, Update } from '../notify';
import { Works } from './Works';
import { Citation } from './citation';

const worksPath = './works.json';
const aboutPath = './about.json';

(async function index() {
  renderRoot(Works(await fetcher<Citation[]>(worksPath)));

  const update = await fetcher<Update>(aboutPath);
  notifyUpdate(update);
})();
