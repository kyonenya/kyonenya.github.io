import { PostListItem } from './PostListItem';
import { Post } from './post';

export const PostList = (posts: Post[]): string => `
  <ul class="bl_posts">
    ${posts.map((post) => PostListItem({ post: posts[post.index] })).join('')}
  </ul>`;

export const TaggedPostList = (posts: Post[], tag: string): string => `
  <h2 class="el_archiveHeader">#${tag}</h2>
  <ul class="bl_posts">
    ${posts
      .map((post) =>
        post.tags.includes(tag)
          ? PostListItem({
              post: posts[post.index],
              tag,
            })
          : ''
      )
      .join('')}
  </ul>`;

export const SearchedPostList = (
  posts: Post[],
  keyword: string,
  tag?: string
): string => `
  <h2 class="el_archiveHeader">「${keyword}」</h2>
  <ul class="bl_posts">
    ${posts
      .map((post) =>
        tag === undefined || post.tags.includes(tag)
          ? PostListItem({
              post: posts[post.index],
              tag,
              keyword,
            })
          : ''
      )
      .join('')}
  </ul>`;
