import * as pages from './pages';
import { render } from './render';
import { datarable } from './types';

export const route = (data: datarable[]): void => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  const tag = searchParams.get('tag');

  window.scrollTo(0, 0);
  document.querySelector('.el_search_input')!.classList.remove('hp_hidden');

  if (id && Number.isFinite(Number(id))) {
    document.querySelector('.el_search_input')!.classList.add('hp_hidden'); // disable search form
    return render(pages.article(data[data.length - parseInt(id, 10)]), () =>
      route(data)
    );
  }
  if (window.location.hash !== '') {
    return render(
      pages.searchedPostList(
        data,
        decodeURIComponent(window.location.hash.slice(1)),
        tag
      ),
      () => route(data)
    );
  }
  if (tag != null) {
    return render(pages.taggedPostList(data, tag), () => route(data));
  }
  return render(pages.postList(data), () => route(data));
};
