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
      <ul class="bl_posts">${
        data.map((aData) => {
          return template.postList(data[data.length - aData.id], aData.id);
        }).join('')
      }</ul>`,
    suffix: '',
    description: '',
    pageTitle: '',
    archiveHeader: '',
  });
        
export const createTagged = (data, tag) => ({
  html: `
    <ul class="bl_posts">${
      data.map((aData) => {
        if (tag == null || aData.tags.includes(tag)) {
          return template.postList(data[data.length - aData.id], aData.id, tag);
        }
      }).join('')
    }</ul>`,
  suffix: '',
  description: '',
  pageTitle: `#${tag}｜placet experiri`,
  archiveHeader: `#${tag}`,
});
