import { html_article } from './template.js';

/* 個別記事ページ */
export const createArticle = (post) =>  {
  return {
    html: html_article(post),
    suffix: ` :: ${post.id}`,
    description: `${post.plainText.substr(0, 110)}…`,
    pageTitle: (post.title)  // exists?
      ? `${post.title}｜placet experiri :: ${post.id}`  // 記事タイトルあり
      : `placet experiri :: ${post.id}`,  // 記事タイトルなし
    archiveHeader: '',
  }
}

export const createPostlist = (data) => {
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
        pageTitle: '',
        archiveHeader: '',
    }
}
        
export const createTagged = (data, tag) => {  
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
}
