export const realTimeSearch = (data, word) => {
  for (const eachData of data) {
    const li = document.querySelector(`.bl_posts_item[data-id="${eachData.id}"]`);
    const li_text = document.querySelector(`.bl_posts_summary[data-id="${eachData.id}"]`);
    
    // 記事一覧に表示されてなければ、
    if (eachData.isVisible === false) {
      continue; // スキップして次のループへ。
    }

    let wordIndex = eachData.plainText.indexOf(word);
    const isMatched_title = eachData.title.includes(word); // タイトル簡易検索
    let isMatched_hashtags = eachData.hashtags.includes(word); // ハッシュタグ簡易検索
    let resultText = '…';

    // 表示調整用
    const resultLength = 41; // 検索結果に表示したい文字数は？
    const beforeLength = 15; // 先読み、マッチした検索語句の何文字前から表示したい？
    const afterLength = resultLength - beforeLength - word.length;  // 後読み

    // マッチしたときは（本文・タイトル・タグのいずれかに）
    if (wordIndex != -1 || isMatched_title === true || isMatched_hashtags === true) {
      li.classList.remove('hp_hidden');  // 表示。
      
      // 検索結果に表示するための文字列を決定
      // 検索語句が先頭に近すぎたら、
      if (wordIndex <= beforeLength) {
        wordIndex = beforeLength; // 冒頭から表示して、
        resultText = ''; // 冒頭の'…'を削除。
      }        
      // 結果表示用の文字列
      resultText += eachData.plainText.substr(wordIndex - beforeLength, resultLength)
      // 検索語句が末尾より十分遠ければ、
      const wordIndex_last = wordIndex + word.length + afterLength;
      if (wordIndex_last < eachData.plainText.length) {
        resultText += '…'; // 末尾に'…'を追加。
      }

      // 検索語句をハイライト表示する
      resultText = resultText.replace(new RegExp(word, "g"), `<span class="hp_highlight">${word}</span>`); // （変数を使って複数置換させる方法）
      // DOM要素として追加
      li_text.innerHTML = `<p>${resultText}</p>`;
    } else {
      // マッチしなかったときは、
      li.classList.add('hp_hidden'); // 非表示に。
    }

    // 検索フォームが空になったら、
    if (word === '') {
      li_text.innerHTML = eachData.postText; // 元のテキストに戻す。
    }
  } // for(){...
};
