import { generateSummary } from 'search-summary';
import { TagList } from './TagList';
import { formatYMD, fromNow } from './lib/date-utils';
import { Post } from './post';
import { isMobile } from './useMediaQuery';

const elipsisToken = '…';

const Keyword = (keyword: string) =>
  `<span class="hp_highlight">${keyword}</span>`;

const TextWithKeyword = (text: string, keyword?: string) =>
  keyword ? text.replace(keyword, Keyword(keyword)) : text;

const Title = (title: string, keyword?: string) => `
  <h2 class="bl_posts_title">
    ${TextWithKeyword(title, keyword)}
  </h2>`;

const SearchSummary = (searchSummary: string) => `
  <div class="bl_posts_summary">
    <p class="hp_ellipsis433">
      ${searchSummary}
    </p>
  </div>`;

const MobileSummary = (plainText: string) => `
  <div class="bl_posts_summary">
    <p class="hp_alignJustify">
      ${plainText.substring(0, 134) + elipsisToken}
    </p>
  </div>`;

const Summary = (plainText: string) => `
  <div class="bl_posts_summary">
    <p class="hp_ellipsis654">
      ${plainText.substring(0, 250)}
    </p>
  </div>`;

export const PostListItem = (props: {
  post: Post;
  tag?: string;
  keyword?: string;
}): string => {
  const { post, tag, keyword } = props;
  const searchSummary = generateSummary(post.plainText, keyword, {
    maxLength: 200,
    beforeLength: 48,
    keywordModifier: Keyword,
  });
  const isMatched =
    !keyword ||
    searchSummary ||
    (post.title && post.title.indexOf(keyword) !== -1);

  return `
    <li
      class="bl_posts_item"
      style="display: ${isMatched ? 'block' : 'none'}"
    >
      <a href="?id=${post.id}">
        <header class="bl_posts_header">
          <time class="bl_posts_date">
            ${formatYMD(post.createdAt)}
          </time>
        </header>
        ${post.title ? Title(post.title, keyword) : ''}
        ${
          searchSummary
            ? SearchSummary(searchSummary)
            : (isMobile ? MobileSummary : Summary)(post.plainText)
        }
      </a>
      <footer class="bl_posts_footer">
        <span class="bl_posts_dateago">
          ${fromNow(post.createdAt)}
        </span>
        ${TagList(post.tags, tag)}
      </footer>
    </li>`;
};
