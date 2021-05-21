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

  window.scrollTo(0, 0);
  document.querySelector('.el_search_form')!.classList.remove('hp_hidden');

  if (Number.isFinite(Number(queries.id))) {
    return render(
      pages.article(data[data.length - parseInt(queries.id!, 10)]),
      () => route(data)
    );
    document.querySelector('.el_search_form')!.classList.add('hp_hidden'); // disable search form
  }
  if (window.location.hash !== '') {
    return render(
      pages.searchedPostList(
        data,
        decodeURIComponent(window.location.hash.slice(1)),
        queries.tag
      ),
      () => route(data)
    );
  }
  if (queries.tag != null) {
    return render(pages.taggedPostList(data, queries.tag), () => route(data));
  }
  return render(pages.postList(data), () => route(data));
};
