import { getUrlQueries } from '../index';

test('複数のクエリ文字列', () => {
  expect(getUrlQueries('foo=1&bar=2'))
    .toBe('');
});