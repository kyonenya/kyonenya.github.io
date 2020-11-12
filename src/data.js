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
    
    return aData;
  });
};
