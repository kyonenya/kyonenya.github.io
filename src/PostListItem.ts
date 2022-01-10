import { generateSummary } from 'search-summary';
import { Tags } from './Tags';
import dayjs from './lib/dayjs';
import { Post } from './post';

const summaryLength = 134;
const noTitleSummaryLength = 113;
const elipsisToken = '…';

const Title = (title: string, keyword?: string) => `
  <h2 class="bl_posts_title">
    ${
      keyword
        ? title.replace(
            keyword,
            `<span class="hp_highlight">${keyword}</span>`
          )
        : title
    }
  </h2>`;

const Summary = (post: Post, searchSummary: string | undefined) => `
  <div class="bl_posts_summary">
    <p>
      ${
        searchSummary ||
        `${post.plainText.substring(
          0,
          post.title ? summaryLength : noTitleSummaryLength
        )}￼`
      }
      ${elipsisToken}
    </p>
  </div>`;

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
        ${
          !keyword ||
          searchSummary ||
          (post.title && post.title.indexOf(keyword) !== -1)
            ? ''
            : ' hp_hidden'
        }"
    >
      <a href="?id=${post.id}">
        <header class="bl_posts_header">
          <time class="bl_posts_date">
            ${dayjs(post.createdAt).format('YYYY-MM-DD')}
          </time>
        </header>
        ${post.title ? Title(post.title, keyword) : ''}
        ${Summary(post, searchSummary)}
      </a>
      <footer class="bl_posts_footer">
        <span class="bl_posts_dateago">
          ${dayjs(post.createdAt).fromNow()}
        </span>
        <ul class="bl_tags">
          ${Tags(post.tags, tag)}
        </ul>
      </footer>
    </li>`;
};
