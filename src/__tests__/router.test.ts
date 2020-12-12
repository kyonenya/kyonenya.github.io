import { queriesFor } from '../router';

test('queriesFor_basic', () => {
  expect(queriesFor('')).toEqual({});
});

test('queriesFor_2values', () => {
  expect(queriesFor('?foo=1&bar=2')).toEqual({
    foo: '1',
    bar: '2',
  });
});
