import { templates } from './templates.js';
import { search } from './search.js';

const article = aData => ({
  body: templates.article(aData),
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
      ${data.map(aData => templates.postList(data[aData.index])).join('')}
    </ul>`,
  suffix: '',
  description: '',
  title: 'placet experiri',
  archiveHeader: '',
});

const taggedPostList = (data, filteredTag) => ({
  body: `
    <ul class="bl_posts">
      ${data.map((aData) => {
        if (filteredTag !== null && !aData.tags.includes(filteredTag)) {
          return '';
        }
        return templates.postList(data[aData.index], filteredTag);
      }).join('')}
    </ul>`,
  suffix: '',
  description: '',
  title: `#${filteredTag}｜placet experiri`,
  archiveHeader: `#${filteredTag}`,
});

// TODO: word -> keyword
const searchedPostList = (data, keyword, filteredTag = null) => {
  return {
    body: `
      <ul class="bl_posts">
      ${data.map((aData) => {
        if (filteredTag !== null && !aData.tags.includes(filteredTag)) {
          return '';
        }
        return templates.postList(data[aData.index], filteredTag, search(aData, keyword));
      }).join('')}
      </ul>`,
    suffix: '',
    description: '',
    title: `「${keyword}」｜placet experiri`,
    archiveHeader: `「${keyword}」`,
  };
};

export const pages = {
  article,
  postList,
  taggedPostList,
  searchedPostList,
};
