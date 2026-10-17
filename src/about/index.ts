import { compareAsc } from '../lib/dateUtils';
import { fetcher } from '../lib/utils';
import type { Notice } from '../notify';
import { Notices } from './Notices';

const aboutPath = './about.json';

void (async function index() {
  const notices = [...(await fetcher<Notice[]>(aboutPath))].sort((a, b) =>
    compareAsc(new Date(b.date), new Date(a.date)),
  );
  document.getElementById('notices')!.innerHTML = Notices(
    notices.filter(({ pinned }) => pinned),
  );
  document.getElementById('pastNotices')!.innerHTML = Notices(
    notices.filter(({ pinned }) => !pinned),
  );
})();
