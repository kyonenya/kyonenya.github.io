import { fetcher } from '../lib/utils';
import { notifyUpdate, Update } from '../notify';
import { renderRoot } from '../render';
import { Works } from './Works';
import { Citation } from './citation';

const worksPath = './works.json';
const aboutPath = './about.json';

void (async function index() {
  const citations = await fetcher<Citation[]>(worksPath);
  const higlitedId = decodeURIComponent(window.location.hash.replace('#', ''));
  renderRoot(Works(citations, higlitedId));

  const update = await fetcher<Update>(aboutPath);
  notifyUpdate(update);
})();
