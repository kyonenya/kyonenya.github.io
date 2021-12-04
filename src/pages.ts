import dayjs from './dayjs';
import { Post } from './post';
import { Page } from './render';
import { search } from './search';
import * as templates from './templates';

export const postList = (posts: Post[]): Page => ({
  body: `
    <ul class="bl_posts">
      ${posts
        .filter((post) => dayjs(post.date).isBefore(dayjs())) // exclude reserved post
        .map((post) => templates.postList(posts[post.index]))
        .join('')}
    </ul>`,
  suffix: '',
  description: '',
  title: 'placet experiri',
  archiveHeader: '',
});

export const taggedPostList = (posts: Post[], filteredTag: string): Page => ({
  body: `
    <ul class="bl_posts">
      ${posts
        .map((post) => {
          if (filteredTag !== null && !post.tags.includes(filteredTag)) {
            return '';
          }
          return templates.postList(posts[post.index], filteredTag);
        })
        .join('')}
    </ul>`,
  suffix: '',
  description: '',
  title: `#${filteredTag}｜placet experiri`,
  archiveHeader: `#${filteredTag}`,
});

export const searchedPostList = (
  posts: Post[],
  keyword: string,
  filteredTag: string | null = null
): Page => ({
  body: `
    <ul class="bl_posts">
      ${posts
        .map((post) => {
          if (filteredTag !== null && !post.tags.includes(filteredTag)) {
            return '';
          }
          return templates.postList(
            posts[post.index],
            filteredTag,
            search(keyword, post)
          );
        })
        .join('')}
    </ul>`,
  suffix: '',
  description: '',
  title: `「${keyword}」｜placet experiri`,
  archiveHeader: `「${keyword}」`,
});
