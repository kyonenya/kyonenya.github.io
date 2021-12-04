export const hashtag = (aTag: string): string =>
  `<li><link-internal href="?tag=${aTag}">#${aTag}</link-internal></li>`;

export const matchedHashtag = (aTag: string): string =>
  `<li><link-internal href="?tag=${aTag}" class="hp_bold">#${aTag}</link-internal></li>`;

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
