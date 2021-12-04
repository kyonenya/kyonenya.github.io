import dayjs from './dayjs';
import { Post } from './post';

export const hashtag = (aTag: string): string =>
  `<li><link-internal href="?tag=${aTag}">#${aTag}</link-internal></li>`;

export const matchedHashtag = (aTag: string): string =>
  `<li><link-internal href="?tag=${aTag}" class="hp_bold">#${aTag}</link-internal></li>`;

export const postList = (
  post: Post,
  filteredTag: string | null = null,
  searched: { isMatched?: boolean; summary?: string } = {}
): string => `<li
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
          .map((aTag) => {
            if (aTag === filteredTag) {
              return matchedHashtag(aTag);
            }
            return hashtag(aTag);
          })
          .join('')}
      </ul>
    </footer>
  </li>`;

export const searchedSummary = (aResult: {
  beforeEllipsis: string;
  beforeText: string;
  word: string;
  afterText: string;
  afterEllipsis: string;
}): string => `
  ${aResult.beforeEllipsis}${aResult.beforeText}
  <span class="hp_highlight">
    ${aResult.word}
  </span>
  ${aResult.afterText}${aResult.afterEllipsis}`;
