import { template } from './template.js';

const article = (aData) => ({
  html: template.article(aData),
  suffix: ` :: ${aData.id}`,
  description: `${aData.plainText.substr(0, 110)}…`,
  pageTitle: (aData.title)
    ? `${aData.title}｜placet experiri :: ${aData.id}`
    : `placet experiri :: ${aData.id}`,
  archiveHeader: '',
});

const postList = (data) => ({
  html: `
    <ul class="bl_posts">${
      data.map(aData => template.postList(data[data.length - aData.id], aData.id)).join('')
    }</ul>`,
  suffix: '',
  description: '',
  pageTitle: '',
  archiveHeader: '',
});
        
const taggedPostList = (data, tag) => ({
  html: `
    <ul class="bl_posts">${
      data.map(aData => {
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

export const html = {
  article,
  postList,
  taggedPostList,
};
