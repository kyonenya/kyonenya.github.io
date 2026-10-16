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

export async function app(rootDir = true): Promise<void> {
  recalcFromNow();

  const rootPath = rootDir ? '.' : '..';
  const postsPath = `${rootPath}/posts.json`;
  const aboutPath = `${rootPath}/about.json`;

  const posts = jsonToPosts(await fetcher<JSONPost[]>(postsPath));
  if (rootDir) route(posts, true); // initial rendering
  registerRerouter(() => route(posts));
  defineBlogCard(posts);
  notifyUpdate(await fetcher<Notice[]>(aboutPath));
}
