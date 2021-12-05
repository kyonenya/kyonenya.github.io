import { generateSummary } from 'search-summary';
import dayjs from './dayjs';
import { Post } from './post';
import { hashtag, matchedHashtag } from './templates';

const summaryLength = 134;
const summaryLengthNoTitle = 113;
const elipsisToken = '…';

const ListItemBody = (post: Post, searchSummary: string | undefined) => {
  if (!post.title) {
    return `
      <div class="bl_posts_summary">
        <p>
          ${
            searchSummary ||
            `${post.plainText.substr(0, summaryLengthNoTitle)}${elipsisToken}`
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
          `${post.plainText.substr(0, summaryLength)}${elipsisToken}`
        }
      </p>
    </div>`;
};

const KeywordHighlighted = (keyword: string) =>
  `<span class="hp_highlight">${keyword}</span>`;

export const PostListItem = (props: {
  post: Post;
  tag?: string;
  keyword?: string;
}): string => {
  const { post } = props;
  const searchSummary = props.keyword
    ? generateSummary(post.plainText, props.keyword, {
        maxLength: 50,
        beforeLength: 20,
        elipsisToken,
        keywordModifier: (k) => KeywordHighlighted(k),
      })
    : undefined;

  return `
    <li
      class="
        bl_posts_item
        ${props.keyword && !searchSummary ? ' hp_hidden' : ''}"
    >
      <link-internal href="?id=${post.id}">
        <header class="bl_posts_header">
          <time class="bl_posts_date">
            ${dayjs(post.date).format('YYYY-MM-DD')}
          </time>
        </header>
        ${ListItemBody(post, searchSummary)}
      </link-internal>
      <footer class="bl_posts_footer">
        <span class="bl_posts_dateago">
          ${dayjs(post.date).fromNow()}
        </span>
        <ul class="bl_tags">
          ${post.tags
            .map((tag) =>
              tag === props.tag ? matchedHashtag(tag) : hashtag(tag)
            )
            .join('')}
        </ul>
      </footer>
    </li>`;
};
