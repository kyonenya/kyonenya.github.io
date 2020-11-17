import { templates } from './templates.js';

export const search = (aData, word) => {
  const resultLength = 50;
  const beforeLength = 20;
  const afterLength = resultLength - beforeLength - word.length;
  const wordIndex = aData.plainText.indexOf(word);
  const beforeIndex = wordIndex - beforeLength;
  const afterIndex = wordIndex + word.length;
  const isMatched = wordIndex !== -1
    || aData.title.includes(word)
    || aData.tags.includes(word);
  
  if (wordIndex === -1) {
    return [isMatched, `${aData.plainText.substr(0, resultLength)}…`];
  }
  if (beforeIndex <= 0) { // マッチした語句が先頭に近い場合
    return [isMatched, templates.searchedPost({
      beforeEllipsis: '',
      beforeText: aData.plainText.substr(0, wordIndex),
      word: aData.plainText.substr(wordIndex, word.length),
      afterText: aData.plainText.substr(afterIndex, resultLength - afterIndex),
      afterEllipsis: '…',
    })];
  }

  return [isMatched, templates.searchedPost({
    beforeEllipsis: '…',
    beforeText: aData.plainText.substr(beforeIndex, beforeLength),
    word: aData.plainText.substr(wordIndex, word.length),
    afterText: aData.plainText.substr(afterIndex, afterLength),
    afterEllipsis: (beforeIndex + resultLength < aData.plainText.length)
      ? '…'
      : '',
  })];
};

export const searchPosts = (data, word) => {
  data.forEach((aData) => {
    const postItemElement = document.querySelector(`.bl_posts_item[data-id="${aData.id}"]`);
    const summaryElement = document.querySelector(`.bl_posts_summary[data-id="${aData.id}"]`);

    if (!postItemElement) {
      return;
    }

    const [isMatched, summary] = search(aData, word);
    
    if (isMatched) {
      postItemElement.classList.remove('hp_hidden');
      summaryElement.innerHTML = `<p>${summary}</p>`;
    } else {
      postItemElement.classList.add('hp_hidden');
    }

    if (word === '') {
      summaryElement.innerHTML = `${aData.plainText.substr(0, 125)}…`;
    }
  });
};
