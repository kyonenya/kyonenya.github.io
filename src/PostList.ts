import { PostListItem } from './PostListItem';
import dayjs from './dayjs';
import { Post } from './post';

export const PostList = (posts: Post[]): string => `
  <ul class="bl_posts">
    ${posts
      .filter((post) => dayjs(post.date).isBefore(dayjs())) // exclude reserved post
      .map((post) => PostListItem({ post: posts[post.index] }))
      .join('')}
  </ul>`;

export const PostListSearched = (
  posts: Post[],
  keyword: string,
  filteredTag: string | null
): string => `
  <ul class="bl_posts">
    ${posts
      .map((post) => {
        if (filteredTag !== null && !post.tags.includes(filteredTag)) {
          return '';
        }
        return PostListItem({
          post: posts[post.index],
          tag: filteredTag ?? undefined, // TODO: remove null
          keyword: keyword,
        });
      })
      .join('')}
  </ul>`;

export const PostListTagged = (posts: Post[], filteredTag: string): string => `
  <ul class="bl_posts">
    ${posts
      .map((post) => {
        if (filteredTag !== null && !post.tags.includes(filteredTag)) {
          return '';
        }
        return PostListItem({
          post: posts[post.index],
          tag: filteredTag,
        });
      })
      .join('')}
  </ul>`;
