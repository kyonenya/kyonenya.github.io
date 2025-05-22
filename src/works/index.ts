import { renderRoot } from '../lib/render';
import { fetcher } from '../lib/utils';
import { notifyUpdate, Update } from '../notify';
import { Works } from './Works';
import { Citation } from './citation';

const worksPath = './works.json';
const aboutPath = './about.json';

(async function index() {
  const citations = await fetcher<Citation[]>(worksPath);
  const id = decodeURIComponent(window.location.hash.replace('#', ''));
  renderRoot(Works(citations, id));

  const update = await fetcher<Update>(aboutPath);
  notifyUpdate(update);
})();
