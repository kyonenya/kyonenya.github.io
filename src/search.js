export const realTimeSearch = (data) => {
  // 検索ボックスに入力された値
  const word = document.querySelector('.el_search_form').value;
  
  // 全件ループ開始
  for (const eachData of data) {
    const li = document.querySelector(`.bl_posts_item[data-id="${eachData.id}"]`);
    const li_text = document.querySelector(`.bl_posts_summary[data-id="${eachData.id}"]`);

    // 記事一覧に表示されてなければ、
    if (!li) {
      continue; // スキップして次のループへ。
    }

    let wordIndex = eachData.plainText.indexOf(word);

    // マッチしたときは（本文・タイトル・タグのいずれかに）
    if (wordIndex != -1 || eachData.title.includes(word) || eachData.tags.includes(word)) {
      li.classList.remove('hp_hidden'); // 表示。
      // DOM要素として追加
      li_text.innerHTML = `<p>${adjustText(eachData, word, wordIndex)}</p>`;
    } else {
      // マッチしなかったときは、
      li.classList.add('hp_hidden'); // 非表示に。
    }

    // 検索フォームが空になったら、
    if (word === '') {
      li_text.innerHTML = `${eachData.plainText.substr(0, 125)}…`; // 元のテキストに戻す。
    }
  }
};

const adjustText = (eachData, word, wordIndex) => {
  const resultLength = 41;
  const beforeLength = 15;
  
  if (wordIndex === -1) {
    return `<span>${eachData.plainText.substr(0, resultLength)}…</span>`;
  }
  
  let beforeText= '';
  let afterText = '';
  
  if (wordIndex <= beforeLength) {
    // 検索語句が先頭に近すぎる場合
    beforeText = `${eachData.plainText.substr(0, wordIndex)}`;
    afterText = `${eachData.plainText.substr(wordIndex + word.length, resultLength - wordIndex - word.length)}…`;
  } else {
    beforeText = `…${eachData.plainText.substr(wordIndex - beforeLength, beforeLength)}`;
    afterText = `${eachData.plainText.substr(wordIndex + word.length, resultLength - beforeLength - word.length)}`;
    afterText +=  (wordIndex - beforeLength + resultLength < eachData.plainText.length)
      ? '…'
      : '';
  }
  
  const resultText = `
    <span>${beforeText}</span>
    <span ${wordIndex != -1 ? 'class="hp_highlight"' : ''}>
      ${eachData.plainText.substr(wordIndex, word.length)}
    </span>
    <span>${afterText}</span>
  `;
  
  return resultText;
};
