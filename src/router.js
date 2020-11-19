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

export const route = (data, queries) => {
  const searching = (hash, data, tag = null) => {
    if (hash === '' && tag !== '') return render(pages.taggedPostList(data, tag));
    if (hash === '') return render(pages.postList(data));
    
    return render(pages.searchedPostList(data, decodeURIComponent(hash.slice(1)), tag));
  };
  
  if (Number.isFinite(Number(queries.id))) {
    render(pages.article(data[data.length - queries.id]));
    document.querySelector('.el_search_form').classList.add('hp_hidden'); // disable search form
  } else if (queries.id == null && queries.tag) {
    // TODO: タグフィルター時の検索
    render(pages.taggedPostList(data, queries.tag));
    window.onhashchange = () => {
      searching(window.location.hash, data, queries.tag);
    };
  } else if (queries.id == null) {
    render(pages.postList(data));
    window.onhashchange = () => {
      searching(window.location.hash, data);
    };
  }
};
