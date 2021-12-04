import dayjs from './dayjs';
import { Post } from './post';
import { Page } from './render';
import { hashtag, matchedHashtag } from './templates';

export const PostListItem = (
  post: Post,
  filteredTag: string | null = null,
  searched: { isMatched?: boolean; summary?: string } = {}
): string => `
  <li
    class="
      bl_posts_item
      ${
        searched.isMatched || Object.keys(searched).length === 0
          ? ''
          : ' hp_hidden'
      }"
    posts-id=${post.id}
  >
    <link-internal href="?id=${post.id}">
      <header class="bl_posts_header">
        <time class="bl_posts_date" 
          datetime="${dayjs(post.date).format('YYYY-MM-DD HH:mm')}"
        >
          ${dayjs(post.date).format('YYYY-MM-DD')}
        </time>
      </header>
      <h2 class="bl_posts_title">
        ${post.title}
      </h2>
      <div class="bl_posts_summary" posts-id=${post.id}>
        <p>
          ${
            !searched.isMatched
              ? `${post.plainText.substr(0, 125)}…`
              : searched.summary!
          }
        </p>
      </div>
    </link-internal>
    <footer class="bl_posts_footer">
      <span class="bl_posts_dateago">${dayjs(post.date).fromNow()}</span>
      <ul class="bl_tags">
        ${post.tags
          .map((tag) => {
            if (tag === filteredTag) {
              return matchedHashtag(tag);
            }
            return hashtag(tag);
          })
          .join('')}
      </ul>
    </footer>
  </li>`;

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
