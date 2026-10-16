import { fetcher } from '../lib/utils';
import { notifyUpdate, type Notice } from '../notify';
import { renderRoot } from '../render';
import { Works } from './Works';
import type { Citation } from './citation';

const worksPath = './works.json';
const aboutPath = './about.json';

void (async function index() {
  const citations = await fetcher<Citation[]>(worksPath);
  const higlitedId = decodeURIComponent(window.location.hash.replace('#', ''));
  renderRoot(Works(citations, higlitedId));

  const notices = await fetcher<Notice[]>(aboutPath);
  notifyUpdate(notices);
})();
