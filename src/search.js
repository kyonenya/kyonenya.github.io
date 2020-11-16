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
      li_text.innerHTML = eachData.plainText.substr(0, 125); // 元のテキストに戻す。
    }
  }
};

const adjustText = (eachData, word, wordIndex) => {
  const resultLength = 41; // 検索結果に表示したい文字数は？
  const beforeLength = 15; // 先読み、マッチした検索語句の何文字前から表示したい？
  const afterLength = resultLength - beforeLength - word.length; // 後読み      
  let resultText = '…';
  
  // 検索語句が先頭に近すぎたら、
  if (wordIndex <= beforeLength) {
    wordIndex = beforeLength; // 冒頭から表示して、
    resultText = '' ; // 冒頭の'…'を削除。
  }        
  // 結果表示用の文字列
  resultText += eachData.plainText.substr(wordIndex - beforeLength, resultLength);
  // 検索語句が末尾より十分遠ければ、
  if (wordIndex + word.length + afterLength < eachData.plainText.length) {
    resultText += '…'; // 末尾に'…'を追加。
  }
  // 検索語句をハイライト表示する
  resultText = resultText.replace(new RegExp(word, "g"), `<span class="hp_highlight">${word}</span>`); // 変数を使って複数置換させる方法
  
  return resultText;
};
