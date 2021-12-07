import { Post } from './post';
import { routes } from './routes';

type State = {
  id: number | undefined;
  tag: string | undefined;
  keyword: string | undefined;
};

export function toState(locationSearch: string, locationHash?: string): State {
  const searchParams = new URLSearchParams(locationSearch);
  const id = searchParams.get('id');
  const tag = searchParams.get('tag');

  return {
    id: id ? parseInt(id, 10) : undefined,
    tag: tag ?? undefined,
    keyword:
      locationHash !== undefined && locationHash !== ''
        ? decodeURIComponent(locationHash.slice(1))
        : undefined,
  };
}

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
