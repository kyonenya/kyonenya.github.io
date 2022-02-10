import { PostListItem } from './PostListItem';
import { Post } from './post';

const ArchiveHeader = (text: string) =>
  `<h2 class="el_archiveHeader">${text}</h2>`;

const Component = (children: string, archiveHeaderText?: string) => `
  <section class="ly_container">
    ${archiveHeaderText ? ArchiveHeader(archiveHeaderText) : ''}
    <ul class="bl_postList">
      ${children}
    </ul>
  </section>`;

export const PostList = (posts: Post[]): string =>
  Component(
    posts
      .map((post, i) => PostListItem({ post: posts[i] }))
      .reverse()
      .join('')
  );

export const TaggedPostList = (posts: Post[], tag: string): string =>
  Component(
    posts
      .map((post, i) =>
        post.tags.includes(tag)
          ? PostListItem({
              post: posts[i],
              tag,
            })
          : ''
      )
      .reverse()
      .join(''),
    `#${tag}`
  );

export const SearchedPostList = (
  posts: Post[],
  keyword: string,
  tag?: string
): string =>
  Component(
    posts
      .map((post, i) =>
        tag === undefined || post.tags.includes(tag)
          ? PostListItem({
              post: posts[i],
              tag,
              keyword,
            })
          : ''
      )
      .reverse()
      .join(''),
    `「${keyword}」`
  );
