import { pages } from './pages';
import { render } from './render';
import { datarable } from './types';

export const queriesFor = (
  queryStr: string
): {
  [k: string]: string;
} => {
  if (queryStr === '') {
    return {};
  }

  return queryStr // '?foo=1&bar=2'
    .slice(1)
    .split('&')
    .reduce((acc: { [k: string]: string }, aQuery) => {
      // allow to add new keys
      const [key, value] = aQuery.split('=');
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
};

export const route = (data: datarable[]): void => {
  const queries: {
    id?: string;
    tag?: string;
  } = queriesFor(window.location.search);

  const searching = (hash: string, tag: string | null = null): void => {
    if (hash === '' && tag !== null)
      return render(pages.taggedPostList(data, tag), () => route(data));
    if (hash === '') return render(pages.postList(data), () => route(data));

    return render(
      pages.searchedPostList(data, decodeURIComponent(hash.slice(1)), tag),
      () => route(data)
    );
  };

  if (Number.isFinite(Number(queries.id))) {
    window.scrollTo(0, 0);
    render(pages.article(data[data.length - parseInt(queries.id!, 10)]), () =>
      route(data)
    );
    document.querySelector('.el_search_form')!.classList.add('hp_hidden'); // disable search form
  } else if (queries.id == null && queries.tag) {
    window.scrollTo(0, 0);
    render(pages.taggedPostList(data, queries.tag), () => route(data));
    window.onhashchange = () => {
      searching(window.location.hash, queries.tag);
    };
    document.querySelector('.el_search_form')!.classList.remove('hp_hidden');
  } else if (queries.id == null) {
    render(pages.postList(data), () => route(data));
    window.onhashchange = () => {
      searching(window.location.hash);
    };
    document.querySelector('.el_search_form')!.classList.remove('hp_hidden');
  }
};
