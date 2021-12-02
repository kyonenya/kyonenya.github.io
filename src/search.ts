import * as templates from './templates';
import { Post } from './post';

export const search = (
  word: string,
  post: Post
): {
  isMatched?: boolean;
  summary?: string;
} => {
  const resultLength = 50;
  const beforeLength = 20;
  const afterLength = resultLength - beforeLength - word.length;
  const wordIndex = post.plainText.indexOf(word);
  const beforeIndex = wordIndex - beforeLength;
  const afterIndex = wordIndex + word.length;
  const isMatched = wordIndex !== -1 || post.title.includes(word);

  if (word === '') return {};
  if (wordIndex === -1) {
    return {
      isMatched,
      summary: `${post.plainText.substr(0, resultLength)}…`,
    };
  }
  if (beforeIndex <= 0) {
    // matched keyword is near the top
    return {
      isMatched,
      summary: templates.searchedSummary({
        beforeEllipsis: '',
        beforeText: post.plainText.substr(0, wordIndex),
        word: post.plainText.substr(wordIndex, word.length),
        afterText: post.plainText.substr(afterIndex, resultLength - afterIndex),
        afterEllipsis: '…',
      }),
    };
  }

  return {
    isMatched,
    summary: templates.searchedSummary({
      beforeEllipsis: '…',
      beforeText: post.plainText.substr(beforeIndex, beforeLength),
      word: post.plainText.substr(wordIndex, word.length),
      afterText: post.plainText.substr(afterIndex, afterLength),
      afterEllipsis:
        beforeIndex + resultLength < post.plainText.length ? '…' : '',
    }),
  };
};

const searchFormElement = <HTMLFormElement>(
  document.querySelector('.el_search_form')
);
const searchInputElement = <HTMLInputElement>(
  document.querySelector('.el_search_input')
);

export function activateSearchForm(invokeRoute: () => void): void {
  searchFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = `${window.location.search}#${searchInputElement.value}`;
    window.history.pushState(query, query, query);
    invokeRoute();
  });
}
