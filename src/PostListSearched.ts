import { PostListItem } from './PostListItem';
import { Post } from './post';
import { Page } from './render';
import { search } from './search';

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
        return PostListItem(
          posts[post.index],
          filteredTag,
          search(keyword, post)
        );
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
