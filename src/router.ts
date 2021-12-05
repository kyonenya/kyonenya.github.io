import { ArticlePage } from './Article';
import { PostListPage } from './PostList';
import { PostListSearchedPage } from './PostListSearched';
import { PostListTaggedPage } from './PostListTagged';
import { Post } from './post';
import { render } from './render';

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

export const route = (posts: Post[]): void => {
  const state = toState(window.location.search, window.location.hash);

  window.scrollTo(0, 0);
  document.querySelector('.el_search_input')?.classList.remove('hp_hidden');

  if (state.id !== undefined) {
    document.querySelector('.el_search_input')?.classList.add('hp_hidden'); // disable search form
    return render(ArticlePage(posts.find((post) => post.id === state.id)!));
  }
  if (state.keyword !== undefined) {
    return render(PostListSearchedPage(posts, state.keyword, state.tag));
  }
  if (state.tag !== undefined) {
    return render(PostListTaggedPage(posts, state.tag));
  }
  return render(PostListPage(posts));
};
