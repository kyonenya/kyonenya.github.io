import { templates } from './templates.js';

export const search = (aData, word) => {
  const resultLength = 50;
  const beforeLength = 20;
  const afterLength = resultLength - beforeLength - word.length;
  const wordIndex = aData.plainText.indexOf(word);
  const beforeIndex = wordIndex - beforeLength;
  const afterIndex = wordIndex + word.length;
  const isMatched = wordIndex !== -1 || aData.title.includes(word);
  const on = true; // TODO: これなしで済ませる冴えたやり方：検索OFF時に空のオブジェクトを返す？

  if (wordIndex === -1) {
    return {
      on,
      isMatched,
      summary: `${aData.plainText.substr(0, resultLength)}…`,
    };
  }
  if (beforeIndex <= 0) { // マッチした語句が先頭に近い場合
    return {
      on,
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
    on,
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
