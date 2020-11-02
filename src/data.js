import { html_postlist, html_article, html_hashtags, html_hashtags_highlighted } from './template.js';

export const process = (data) => {
  for (const eachData of data) {  // data[]オブジェクト配列にプロパティを追加

    // 1. ダブルダッシュ——が途切れてしまうので罫線二つに置換しておく
    eachData.text = eachData.text.replace(/——/g, '──');
    eachData.title = eachData.title.replace(/——/g, '──');

    // 2. マークアップを削除してプレーンテキストを生成しておく
    eachData.plainText = eachData.text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');

    // 3. 記事一覧リストでの表示用文字列を作っておく
    const postTextLength = 125;  // 記事一覧に何文字表示するか？
    // 長文なら、
    if (eachData.plainText.length > postTextLength) {
      eachData.postText = `${eachData.plainText.substr(0, postTextLength)}…`;  // 冒頭n文字分だけを省略表示。
    } else {  // 短文なら、
      eachData.postText = eachData.plainText;  // プレーンテキストそのまま
    };
    // 4.  ハッシュタグを生成しておく
    eachData.hashtags = eachData.tags
        .map((eachTag) => {
          if (eachTag === status.tag) {  // タグフィルターにマッチしているなら、
            return html_hashtags_highlighted(eachTag);  // 当該タグをハイライト。
          } else {
            return html_hashtags(eachTag);
          }
        })
        .join('');
    // 5. 記事リストのHTMLを生成しておく
    const i = data.length - eachData.id;
    eachData.postlistHtml = html_postlist(data[i], eachData.id);        
  }
  
  return data;
}
