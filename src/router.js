import { pages } from './pages.js';
import { render } from './render.js';

export const queriesFor = (queryStr) => { // '?foo=1&bar=2'
  if (!queryStr) {
    return {};
  }

  return queryStr.slice(1).split('&') // ['foo=1', 'bar=2']
    .reduce((acc, aQuery) => {
      const keyAndValue = aQuery.split('='); // ['foo', '1']
      acc[keyAndValue[0]] = decodeURIComponent(keyAndValue[1]); // { foo: 1 }
      return acc;
    }, {});
};

export const route = (data, queries) => {
  if (Number.isFinite(Number(queries.id))) {
    render(pages.article(data[data.length - queries.id]));
    document.querySelector('.el_search_form').classList.add('hp_hidden'); // disable search form
  } else if (queries.id == null && queries.tag) {
    render(pages.taggedPostList(data, queries.tag));
  } else if (queries.id == null) {
    render(pages.postList(data));
    window.onhashchange = () => {
      render(pages.searchedPostList(data, decodeURIComponent(window.location.hash.slice(1))));
    };
  }
};
