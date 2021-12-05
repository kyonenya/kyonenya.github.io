import { PostListItem } from './PostListItem';
import { Post } from './post';
import { Page } from './render';

const PostListSearched = (
  posts: Post[],
  keyword: string,
  filteredTag: string | null
) => `
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

export const PostListSearchedPage = (
  posts: Post[],
  keyword: string,
  filteredTag: string | null = null
): Page => ({
  body: PostListSearched(posts, keyword, filteredTag),
  suffix: '',
  description: '',
  title: `「${keyword}」｜placet experiri`,
  archiveHeader: `「${keyword}」`,
});
