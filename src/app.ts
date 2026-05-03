import { defineBlogCard } from './BlogCard';
import { fetcher } from './lib/utils';
import { notifyUpdate, Update } from './notify';
import { jsonToPosts, JSONPost } from './post';
import { registerRerouter } from './reroute';
import { route } from './route';

export async function app(
  initialRender = true,
  subDir?: boolean
): Promise<void> {
  const rootPath = subDir ? '..' : '.';
  const postsPath = `${rootPath}/posts.json`;
  const aboutPath = `${rootPath}/about.json`;

  const posts = jsonToPosts(await fetcher<JSONPost[]>(postsPath));
  if (initialRender) route(posts);
  registerRerouter(() => route(posts));
  defineBlogCard(posts);
  notifyUpdate(await fetcher<Update>(aboutPath));
}
