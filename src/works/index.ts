import { fetcher } from '../lib/utils';
import { notifyUpdate, type Notice } from '../notify';
import { renderRoot } from '../render';
import { Works } from './Works';
import type { Citation } from './citation';

const worksPath = './works.json';
const aboutPath = './about.json';

void (async function index() {
  const citations = await fetcher<Citation[]>(worksPath);
  const render = () =>
    renderRoot(
      Works(
        citations,
        decodeURIComponent(window.location.hash.replace('#', '')),
      ),
    );

  render();
  window.addEventListener('hashchange', render);

  const notices = await fetcher<Notice[]>(aboutPath);
  notifyUpdate(notices);
})();
