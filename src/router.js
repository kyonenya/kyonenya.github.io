import { pages } from './pages.js';
import { render } from './render.js';

export const queriesFor = (queryStr) => { // '?foo=1&bar=2'
  if (queryStr === '') {
    return {};
  }

  return queryStr.slice(1).split('&') // ['foo=1', 'bar=2']
    .reduce((acc, aQuery) => {
      const [key, value] = aQuery.split('='); // ['foo', '1']
      acc[key] = decodeURIComponent(value); // { foo: 1 }
      return acc;
    }, {});
};

export const route = (data) => {
  const queries = queriesFor(window.location.search);
  const searching = (hash, tag = null) => {
    if (hash === '' && tag !== null) return render(pages.taggedPostList(data, tag), data, route);
    if (hash === '') return render(pages.postList(data), data, route);

    return render(pages.searchedPostList(data, decodeURIComponent(hash.slice(1)), tag),
      data, route);
  };

  if (Number.isFinite(Number(queries.id))) {
    render(pages.article(data[data.length - queries.id]), data, route);
    document.querySelector('.el_search_form').classList.add('hp_hidden'); // disable search form
  } else if (queries.id == null && queries.tag) {
    render(pages.taggedPostList(data, queries.tag), data, route);
    window.onhashchange = () => {
      searching(window.location.hash, queries.tag, data);
    };
    document.querySelector('.el_search_form').classList.remove('hp_hidden');
  } else if (queries.id == null) {
    render(pages.postList(data), data, route);
    window.onhashchange = () => {
      searching(window.location.hash);
    };
    document.querySelector('.el_search_form').classList.remove('hp_hidden');
  }
};
