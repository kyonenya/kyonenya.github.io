import { templates } from './templates.js';

export const search = (word, aData) => {
  const resultLength = 50;
  const beforeLength = 20;
  const afterLength = resultLength - beforeLength - word.length;
  const wordIndex = aData.plainText.indexOf(word);
  const beforeIndex = wordIndex - beforeLength;
  const afterIndex = wordIndex + word.length;
  const isMatched = wordIndex !== -1 || aData.title.includes(word);

  if (word === '') return {};
  if (wordIndex === -1) {
    return {
      isMatched,
      summary: `${aData.plainText.substr(0, resultLength)}…`,
    };
  }
  if (beforeIndex <= 0) { // matched keyword is near the top
    return {
      isMatched,
      summary: templates.searchedSummary({
        beforeEllipsis: '',
        beforeText: aData.plainText.substr(0, wordIndex),
        word: aData.plainText.substr(wordIndex, word.length),
        afterText: aData.plainText.substr(afterIndex, resultLength - afterIndex),
        afterEllipsis: '…',
      }),
    };
  }

  return {
    isMatched,
    summary: templates.searchedSummary({
      beforeEllipsis: '…',
      beforeText: aData.plainText.substr(beforeIndex, beforeLength),
      word: aData.plainText.substr(wordIndex, word.length),
      afterText: aData.plainText.substr(afterIndex, afterLength),
      afterEllipsis: (beforeIndex + resultLength < aData.plainText.length)
        ? '…'
        : '',
    }),
  };
};
