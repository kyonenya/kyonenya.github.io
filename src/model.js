import { template } from './template.js';

const createHashtags = (tags, filtered = null) => tags.map(eachTag => {
    if (eachTag === filtered) { // タグフィルターにマッチしているなら、
      return template.filteredHashtag(eachTag); // 当該タグをハイライト。
    }
    return template.hashtag(eachTag);
  })
  .join('');

/* 個別記事ページ */
export const createArticle = (data) => (
  {
    html: template.article(data),
    suffix: ` :: ${data.id}`,
    description: `${data.plainText.substr(0, 110)}…`,
    pageTitle: (data.title)  // exists?
      ? `${data.title}｜placet experiri :: ${data.id}`  // 記事タイトルあり
      : `placet experiri :: ${data.id}`,  // 記事タイトルなし
    archiveHeader: '',
  });

export const createPostlist = (data) => {
  for (const eachData of data) {
    eachData.hashtags = createHashtags(eachData.tags);
    
    // 5. 記事リストのHTMLを生成しておく
    const i = data.length - eachData.id;
    eachData.postlistHtml = template.postList(data[i], eachData.id);
  }
  
  return {
    html: `<ul class="bl_posts">${
      data.map((eachData) => {
          return eachData.postlistHtml;
      }).join('')
      }</ul>`,
    suffix: '',
    description: '',
    pageTitle: '',
    archiveHeader: '',
  }
};
        
export const createTagged = (data, tag) => {  
  for (const eachData of data) {
    eachData.hashtags = createHashtags(eachData.tags, tag);
    
    // 5. 記事リストのHTMLを生成しておく
    const i = data.length - eachData.id;
    eachData.postlistHtml = template.postList(data[i], eachData.id);
  }
  
  for (const eachData of data) {
    // 6. 表示・非表示フラグを、タグフィルターに応じてセットしておく
    const tagExists = eachData.tags.includes(tag);  // タグ検索にヒットしたか
    // タグ検索がOFFか、またはタグ検索にヒットしているならば、
    eachData.isVisible = tag == null || tagExists
      ? true  // 表示。
      : false;
  }

  return {
    html: `<ul class="bl_posts">${
      data.map((eachData) => {
        if (eachData.isVisible === true) {
          return eachData.postlistHtml;
        }
      }).join('')
      }</ul>`,
    suffix: '',
    description: '',
    pageTitle: `#${tag}｜placet experiri`,
    archiveHeader: `#${tag}`,
  }
};
