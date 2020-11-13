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
