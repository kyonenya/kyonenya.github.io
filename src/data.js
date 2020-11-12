export const process = data => {
  for (let i = 0; i < data.length; i++) {
    data[i].index = i;
    data[i].id = data.length - i; // overwrite
  }
  
  return data.map(aData => {
    // ダブルダッシュ——が途切れてしまうので罫線二つに置換しておく
    aData.text = aData.text.replace(/——/g, '──');
    aData.title = aData.title.replace(/——/g, '──');
    // マークアップを削除してプレーンテキストを生成しておく
    aData.plainText = aData.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');

    // 記事一覧リストでの表示用文字列を作っておく
    const postTextLength = 125; // 記事一覧に何文字表示するか？
    // 長文なら、
    if (aData.plainText.length > postTextLength) {
      aData.postText = `${aData.plainText.substr(0, postTextLength)}…`; // 冒頭n文字分だけを省略表示。
    } else { // 短文なら、
      aData.postText = aData.plainText; // プレーンテキストそのまま
    }
    
    return aData;
  });
};
