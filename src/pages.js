import { template } from './template.js';

const article = aData => ({
  body: template.article(aData),
  suffix: ` :: ${aData.id}`,
  description: `${aData.plainText.substr(0, 110)}…`,
  title: (aData.title)
    ? `${aData.title}｜placet experiri :: ${aData.id}`
    : `placet experiri :: ${aData.id}`,
  archiveHeader: '',
});

const postList = data => ({
  body: `
    <ul class="bl_posts">
      ${data.map(aData => template.postList(data[aData.index])).join('')}
    </ul>`,
  suffix: '',
  description: '',
  title: '',
  archiveHeader: '',
});

const taggedPostList = (data, filteredTag) => ({
  body: `
    <ul class="bl_posts">
      ${data.map((aData) => {
        if (filteredTag !== null && !aData.tags.includes(filteredTag)) {
          return '';
        }
        return template.postList(data[aData.index], filteredTag);
      }).join('')}
    </ul>`,
  suffix: '',
  description: '',
  title: `#${filteredTag}｜placet experiri`,
  archiveHeader: `#${filteredTag}`,
});

export const pages = {
  article,
  postList,
  taggedPostList,
};
