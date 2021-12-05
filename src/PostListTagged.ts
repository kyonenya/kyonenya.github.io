import { PostListItem } from './PostListItem';
import { Post } from './post';
import { Page } from './render';

const PostListTagged = (posts: Post[], filteredTag: string) => `
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

export const PostListTaggedPage = (
  posts: Post[],
  filteredTag: string
): Page => ({
  body: PostListTagged(posts, filteredTag),
  suffix: '',
  description: '',
  title: `#${filteredTag}｜placet experiri`,
  archiveHeader: `#${filteredTag}`,
});
