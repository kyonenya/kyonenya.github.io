export const hashtag = (tag: string): string =>
  `<li>
    <link-internal href="?tag=${tag}">
      #${tag}
    </link-internal>
  </li>`;

export const matchedHashtag = (tag: string): string =>
  `<li>
    <link-internal href="?tag=${tag}" class="hp_bold">
      #${tag}
    </link-internal>
  </li>`;

export const searchedSummary = (searched: {
  beforeEllipsis: string;
  beforeText: string;
  word: string;
  afterText: string;
  afterEllipsis: string;
}): string => `
  ${searched.beforeEllipsis}
  ${searched.beforeText}
  <span class="hp_highlight">
    ${searched.word}
  </span>
  ${searched.afterText}
  ${searched.afterEllipsis}`;
