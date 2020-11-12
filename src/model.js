import { template } from './template.js';

export const createArticle = (data) => ({
    html: template.article(data),
    suffix: ` :: ${data.id}`,
    description: `${data.plainText.substr(0, 110)}…`,
    pageTitle: (data.title)
      ? `${data.title}｜placet experiri :: ${data.id}`
      : `placet experiri :: ${data.id}`,
    archiveHeader: '',
  });

export const createPostlist = (data) => ({
    html: `
      <ul class="bl_posts">
        ${data.map((aData) => {
          return template.postList(data[data.length - aData.id], aData.id);
        }).join('')}
      </ul>`,
    suffix: '',
    description: '',
    pageTitle: '',
    archiveHeader: '',
  });
        
export const createTagged = (data, tag) => {  
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
      data.map((aData) => {
        if (aData.isVisible === true) {
          return template.postList(data[data.length - aData.id], aData.id, tag);
        }
      }).join('')
      }</ul>`,
    suffix: '',
    description: '',
    pageTitle: `#${tag}｜placet experiri`,
    archiveHeader: `#${tag}`,
  }
};
