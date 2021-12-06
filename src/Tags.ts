const Tag = (tag: string): string =>
  `<li>
    <link-internal href="?tag=${tag}">
      #${tag}
    </link-internal>
  </li>`;

const MatchedTag = (tag: string): string =>
  `<li>
    <link-internal href="?tag=${tag}" class="hp_bold">
      #${tag}
    </link-internal>
  </li>`;

export const Tags = (tags: string[], tagFilter?: string): string => `
  <ul class="bl_tags">
    ${tags
      .map((tag) => (tag === tagFilter ? MatchedTag(tag) : Tag(tag)))
      .join('')}
  </ul>`;
