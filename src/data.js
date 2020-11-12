export const process = data => {
  for (const eachData of data) {
    // 1. ダブルダッシュ——が途切れてしまうので罫線二つに置換しておく
    eachData.text = eachData.text.replace(/——/g, '──');
    eachData.title = eachData.title.replace(/——/g, '──');

    // 2. マークアップを削除してプレーンテキストを生成しておく
    eachData.plainText = eachData.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');

    // 3. 記事一覧リストでの表示用文字列を作っておく
    const postTextLength = 125; // 記事一覧に何文字表示するか？
    // 長文なら、
    if (eachData.plainText.length > postTextLength) {
      eachData.postText = `${eachData.plainText.substr(0, postTextLength)}…`; // 冒頭n文字分だけを省略表示。
    } else { // 短文なら、
      eachData.postText = eachData.plainText; // プレーンテキストそのまま
    }
  }
  
  for (let i = 0; i < data.length; i++) {
    data[i].index = i;
    data[i].id = data.length - i; // overwrite
  }
  
  return data;
};
