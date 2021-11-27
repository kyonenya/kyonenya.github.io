import dayjs from './dayjs';
import { datarable } from './types';

const hashtag = (aTag: string): string =>
  `<li><a href="?tag=${aTag}">#${aTag}</a></li>`;

const matchedHashtag = (aTag: string): string =>
  `<li><a href="?tag=${aTag}" class="hp_bold">#${aTag}</a></li>`;

export const postList = (
  aData: datarable,
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
    data-id=${aData.id}
  >
    <a href="?id=${aData.id}">
      <header class="bl_posts_header">
        <time class="bl_posts_date" 
          datetime="${dayjs(aData.date).format('YYYY-MM-DD HH:mm')}"
        >
          ${dayjs(aData.date).format('YYYY-MM-DD')}
        </time>
      </header>
      <h2 class="bl_posts_title">
        ${aData.title}
      </h2>
      <div class="bl_posts_summary" data-id=${aData.id}>
        <p>
          ${
            !searched.isMatched
              ? `${aData.plainText.substr(0, 125)}…`
              : searched.summary!
          }
        </p>
      </div>
    </a>
    <footer class="bl_posts_footer">
      <span class="bl_posts_dateago">${dayjs(aData.date).fromNow()}</span>
      <ul class="bl_tags">
        ${aData.tags
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

export const article = (aData: datarable): string => `
  <article>
    <header class="bl_text_header">
      <time class="bl_text_date"
        datetime="${dayjs(aData.date).format('YYYY-MM-DD HH:mm')}"
      >
        ${dayjs(aData.date).format('YYYY-MM-DD HH:mm')}
      </time>
    </header>
    <div class="bl_text">
      <h1 class="bl_text_title">${aData.title}</h1>
      ${aData.text}
    </div>
    <footer class="bl_text_footer">
      <span class="bl_posts_dateago">${dayjs(aData.date).fromNow()}</span>
      <ul class="bl_tags">
        ${aData.tags.map((aTag) => hashtag(aTag)).join('')}
      </ul>
    </footer>
  </article>`;

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
