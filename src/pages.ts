import dayjs from 'dayjs';
import * as templates from './templates';
import { search } from './search';
import { datarable, pagable } from './types';

export const article = (aData: datarable): pagable => ({
  body: templates.article(aData),
  suffix: ` :: ${aData.id}`,
  description: `${aData.plainText.substr(0, 110)}…`,
  title: aData.title
    ? `${aData.title}｜placet experiri :: ${aData.id}`
    : `placet experiri :: ${aData.id}`,
  archiveHeader: '',
});

export const postList = (data: datarable[]): pagable => ({
  body: `
    <ul class="bl_posts">
      ${data
        .filter((aData) => dayjs(aData.date).isBefore(dayjs())) // exclude reserved post
        .map((aData) => templates.postList(data[aData.index]))
        .join('')}
    </ul>`,
  suffix: '',
  description: '',
  title: 'placet experiri',
  archiveHeader: '',
});

export const taggedPostList = (
  data: datarable[],
  filteredTag: string
): pagable => ({
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

export const searchedPostList = (
  data: datarable[],
  keyword: string,
  filteredTag: string | null = null
): pagable => ({
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
