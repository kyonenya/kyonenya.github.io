import { compareAsc } from '../lib/dateUtils';
import { fetcher } from '../lib/utils';
import type { Notice } from '../notify';
import { Notices } from './Notices';

const aboutPath = './about.json';

void (async function index() {
  const notices = [...(await fetcher<Notice[]>(aboutPath))].sort((a, b) =>
    compareAsc(new Date(b.date), new Date(a.date)),
  );
  const noticesElement = <HTMLUListElement>document.getElementById('notices');
  const pastNoticesElement = <HTMLUListElement>(
    document.getElementById('pastNotices')
  );

  noticesElement.innerHTML = Notices(notices.filter(({ pinned }) => pinned));
  pastNoticesElement.innerHTML = Notices(
    notices.filter(({ pinned }) => !pinned),
  );
})();
