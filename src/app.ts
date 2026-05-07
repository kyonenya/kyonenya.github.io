import { defineBlogCard } from './BlogCard';
import { fetcher } from './lib/utils';
import { notifyUpdate, type Update } from './notify';
import { jsonToPosts, type JSONPost } from './post';
import { registerRerouter } from './reroute';
import { route } from './route';

export async function app(rootDir = true): Promise<void> {
  const rootPath = rootDir ? '.' : '..';
  const postsPath = `${rootPath}/posts.json`;
  const aboutPath = `${rootPath}/about.json`;

  const posts = jsonToPosts(await fetcher<JSONPost[]>(postsPath));
  if (rootDir) route(posts); // initial rendering
  registerRerouter(() => route(posts));
  defineBlogCard(posts);
  notifyUpdate(await fetcher<Update>(aboutPath));
}
