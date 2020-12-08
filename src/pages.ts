import { templates } from './templates';
import { search } from './search';

const article = (aData) => ({
  body: templates.article(aData),
  suffix: ` :: ${aData.id}`,
  description: `${aData.plainText.substr(0, 110)}…`,
  title: aData.title
    ? `${aData.title}｜placet experiri :: ${aData.id}`
    : `placet experiri :: ${aData.id}`,
  archiveHeader: '',
});

const postList = (data) => ({
  body: `
    <ul class="bl_posts">
      ${data.map((aData) => templates.postList(data[aData.index])).join('')}
    </ul>`,
  suffix: '',
  description: '',
  title: 'placet experiri',
  archiveHeader: '',
});

const taggedPostList = (data, filteredTag) => ({
  body: `
    <ul class="bl_posts">
      ${data
        .map((aData) => {
          if (filteredTag !== null && !aData.tags.includes(filteredTag)) {
            return '';
          }
          return templates.postList(data[aData.index], filteredTag);
        })
        .join('')}
    </ul>`,
  suffix: '',
  description: '',
  title: `#${filteredTag}｜placet experiri`,
  archiveHeader: `#${filteredTag}`,
});

const searchedPostList = (data, keyword, filteredTag = null) => ({
  body: `
    <ul class="bl_posts">
      ${data
        .map((aData) => {
          if (filteredTag !== null && !aData.tags.includes(filteredTag)) {
            return '';
          }
          return templates.postList(
            data[aData.index],
            filteredTag,
            search(keyword, aData)
          );
        })
        .join('')}
    </ul>`,
  suffix: '',
  description: '',
  title: `「${keyword}」｜placet experiri`,
  archiveHeader: `「${keyword}」`,
});

export const pages = {
  article,
  postList,
  taggedPostList,
  searchedPostList,
};
