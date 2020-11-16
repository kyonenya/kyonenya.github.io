import { templates } from './templates.js';

const summaryFor = (aData, word, wordIndex) => {
  const resultLength = 41;
  const beforeLength = 15;
  const beforeIndex = wordIndex - beforeLength;
  const afterIndex = wordIndex + word.length;
  const afterLength = resultLength - beforeLength - word.length;

  if (wordIndex === -1) {
    return `${aData.plainText.substr(0, resultLength)}…`;
  }

  // 検索語句が先頭に近い場合
  if (beforeIndex <= 0) {
    return templates.searchedPost({
      beforeEllipsis: '',
      beforeText: aData.plainText.substr(0, wordIndex),
      word: aData.plainText.substr(wordIndex, word.length),
      afterText: aData.plainText.substr(afterIndex, resultLength - afterIndex),
      afterEllipsis: '…',
    });
  }

  return templates.searchedPost({
    beforeEllipsis: '…',
    beforeText: aData.plainText.substr(beforeIndex, beforeLength),
    word: aData.plainText.substr(wordIndex, word.length),
    afterText: aData.plainText.substr(afterIndex, afterLength),
    afterEllipsis: (beforeIndex + resultLength < aData.plainText.length)
      ? '…'
      : '',
  });
};

export const realTimeSearch = (data) => {
  const word = document.querySelector('.el_search_form').value;

  data.forEach((aData) => {
    const postItemElement = document.querySelector(`.bl_posts_item[data-id="${aData.id}"]`);
    const summaryElement = document.querySelector(`.bl_posts_summary[data-id="${aData.id}"]`);
    const wordIndex = aData.plainText.indexOf(word);

    // 記事一覧に表示されていない場合
    if (!postItemElement) {
      return;
    }

    // マッチした場合
    if (wordIndex !== -1 || aData.title.includes(word) || aData.tags.includes(word)) {
      postItemElement.classList.remove('hp_hidden');
      summaryElement.innerHTML = `<p>${summaryFor(aData, word, wordIndex)}</p>`;
    } else {
      postItemElement.classList.add('hp_hidden');
    }

    // 検索フォームが空になった場合
    if (word === '') {
      summaryElement.innerHTML = `${aData.plainText.substr(0, 125)}…`;
    }
  });
};
