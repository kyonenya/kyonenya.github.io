import { SummaryEntity, generateSummaryEntity } from 'search-summary';
import { Tags } from './Tags';
import { formatYMD, fromNow } from './lib/date-utils';
import { Post } from './post';

const elipsisToken = '…';
const maxLength = 250;

const Keyword = (keyword: string) =>
  `<span class="hp_highlight">${keyword}</span>`;

const TextWithKeyword = (text: string, keyword?: string) =>
  keyword ? text.replace(keyword, Keyword(keyword)) : text;

const Title = (title: string, keyword?: string) => `
  <h2 class="bl_posts_title">
    ${TextWithKeyword(title, keyword)}
  </h2>`;

const SearchSummary = (searchSummary: SummaryEntity) => `
  <div class="bl_posts_summary hp_ellipsis432">
    <p>
      ${searchSummary.isBeforeEllipsed ? elipsisToken : ''}
      ${searchSummary.beforeText}
      ${Keyword(searchSummary.keyword)}
      ${searchSummary.afterText}
    </p>
  </div>`;

const Summary = (post: Post) => `
  <div class="bl_post_summary hp_ellipsis654">
    <p>
      ${post.plainText.substring(0, maxLength)}
    </p>
  </div>`;

export const PostListItem = (props: {
  post: Post;
  tag?: string;
  keyword?: string;
}): string => {
  const { post, tag, keyword } = props;
  const searchSummary = generateSummaryEntity(post.plainText, keyword, {
    maxLength,
    beforeLength: 42,
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
        ${searchSummary ? SearchSummary(searchSummary) : Summary(post)}
      </a>
      <footer class="bl_posts_footer">
        <span class="bl_posts_dateago">
          ${fromNow(post.createdAt)}
        </span>
        <ul class="bl_tags">
          ${Tags(post.tags, tag)}
        </ul>
      </footer>
    </li>`;
};
