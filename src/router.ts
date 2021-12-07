import { Post } from './post';
import { routes } from './routes';
import { toState } from './state';

export function route(posts: Post[]): void {
  const { id, tag, keyword } = toState(
    window.location.search,
    window.location.hash
  );

  routes.beforeEach();

  if (id !== undefined) {
    const post = posts.find((post) => post.id === id);
    if (!post) return;
    return routes.article(post);
  }
  if (keyword !== undefined) {
    return routes.searchedPostList(posts, keyword, tag);
  }
  if (tag !== undefined) {
    return routes.taggedPostList(posts, tag);
  }
  return routes.postList(posts);
}
