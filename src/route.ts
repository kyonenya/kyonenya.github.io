import { isDevelopment } from './lib/utils';
import {
  articleHead,
  articlePage,
  postListHead,
  postListPage,
  taggedPostListPage,
  searchedPostListPage,
} from './pages';
import { excludeReserved, type Post } from './post';
import { renderPage, renderHead } from './render';
import { toState } from './state';

export function route(rawPosts: Post[], forceRerender = false): void {
  const { id, tag, keyword } = toState(
    window.location.search,
    window.location.pathname,
    window.location.hash,
  );

  const posts = isDevelopment(window.location.href)
    ? rawPosts
    : excludeReserved(rawPosts);

  if (id !== null) {
    const post = posts.find((post) => post.id === id);
    if (!post) return; // TODO: 404
    if (!forceRerender && document.querySelector('#root article')) {
      renderHead(articleHead(post)); // reuse SSG article as is
    } else {
      renderPage(articlePage(post));
    }
  } else if (keyword !== null) {
    renderPage(searchedPostListPage(posts, keyword, tag ?? undefined));
  } else if (tag !== null) {
    renderPage(taggedPostListPage(posts, tag));
  } else if (
    !forceRerender &&
    document.querySelectorAll('.bl_postList_item').length === posts.length
  ) {
    renderHead(postListHead); // reuse SSG list as is
  } else {
    renderPage(postListPage(posts));
  }
}
