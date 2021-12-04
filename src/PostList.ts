import dayjs from './dayjs';
import { Post } from './post';
import { Page } from './render';
import { PostListItem } from './PostListItem';

const PostList = (posts: Post[]): string => `
  <ul class="bl_posts">
    ${posts
      .filter((post) => dayjs(post.date).isBefore(dayjs())) // exclude reserved post
      .map((post) => PostListItem(posts[post.index]))
      .join('')}
  </ul>`;

export const PostListPage = (posts: Post[]): Page => ({
  body: PostList(posts),
  suffix: '',
  description: '',
  title: 'placet experiri',
  archiveHeader: '',
});
