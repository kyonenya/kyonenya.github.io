import { defineBlogCard } from './BlogCard';
import { fromNow } from './lib/dateUtils';
import { fetcher } from './lib/utils';
import { notifyUpdate, type Notice } from './notify';
import { jsonToPosts, type JSONPost } from './post';
import { registerRerouter } from './reroute';
import { route } from './route';

function recalcFromNow() {
  document.querySelectorAll('[data-date]').forEach((el) => {
    const dateStr = el.getAttribute('data-date');
    if (!dateStr) return;
    el.textContent = fromNow(new Date(dateStr));
  });
}

export async function app(): Promise<void> {
  recalcFromNow();
  const rootPath = /\/posts\/\d+/.test(window.location.pathname) ? '..' : '.';
  const posts = jsonToPosts(
    await fetcher<JSONPost[]>(`${rootPath}/posts.json`),
  );
  route(posts);
  registerRerouter(() => route(posts, true)); // ignore SSG and refresh
  defineBlogCard(posts);
  notifyUpdate(await fetcher<Notice[]>(`${rootPath}/about.json`));
}
