import { generateSummary } from 'search-summary';
import { Tags } from './Tags';
import dayjs from './lib/dayjs';
import { Post } from './post';

const summaryLength = 134;
const noTitleSummaryLength = 113;
const elipsisToken = '…';

const ListItemBody = (post: Post, searchSummary: string | undefined) => {
  if (!post.title) {
    // prettier-ignore
    return `
      <div class="bl_posts_summary">
        <p>
          ${
            searchSummary ||
            `${post.plainText.substring(0, noTitleSummaryLength)}${elipsisToken}`
          }
        </p>
      </div>`;
  }

  return `
    <h2 class="bl_posts_title">${post.title}</h2>
    <div class="bl_posts_summary">
      <p>
        ${
          searchSummary ||
          `${post.plainText.substring(0, summaryLength)}${elipsisToken}`
        }
      </p>
    </div>`;
};

export const PostListItem = (props: {
  post: Post;
  tag?: string;
  keyword?: string;
}): string => {
  const { post, tag, keyword } = props;
  const searchSummary = keyword
    ? generateSummary(post.plainText, keyword, {
        maxLength: 50,
        beforeLength: 20,
        elipsisToken,
        keywordModifier: (k) => `<span class="hp_highlight">${k}</span>`,
      })
    : undefined;

  return `
    <li
      class="
        bl_posts_item
        ${keyword && !searchSummary ? ' hp_hidden' : ''}"
    >
      <router-link href="?id=${post.id}">
        <header class="bl_posts_header">
          <time class="bl_posts_date">
            ${dayjs(post.date).format('YYYY-MM-DD')}
          </time>
        </header>
        ${ListItemBody(post, searchSummary)}
      </router-link>
      <footer class="bl_posts_footer">
        <span class="bl_posts_dateago">
          ${dayjs(post.date).fromNow()}
        </span>
        <ul class="bl_tags">
          ${Tags(post.tags, tag)}
        </ul>
      </footer>
    </li>`;
};
