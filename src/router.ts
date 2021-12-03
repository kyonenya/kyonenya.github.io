import * as pages from './pages';
import { Post } from './post';
import { render } from './render';

export const route = (posts: Post[]): void => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  const tag = searchParams.get('tag');

  window.scrollTo(0, 0);
  document.querySelector('.el_search_input')?.classList.remove('hp_hidden');

  if (id && Number.isFinite(Number(id))) {
    document.querySelector('.el_search_input')?.classList.add('hp_hidden'); // disable search form
    return render(pages.article(posts[posts.length - parseInt(id, 10)]));
  }
  if (window.location.hash !== '') {
    return render(
      pages.searchedPostList(
        posts,
        decodeURIComponent(window.location.hash.slice(1)),
        tag
      )
    );
  }
  if (tag != null) {
    return render(pages.taggedPostList(posts, tag));
  }
  return render(pages.postList(posts));
};
