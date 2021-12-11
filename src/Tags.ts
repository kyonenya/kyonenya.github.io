const Tag = (tag: string): string =>
  `<li>
    <router-link href="?tag=${tag}">
      #${tag}
    </router-link>
  </li>`;

const MatchedTag = (tag: string): string =>
  `<li>
    <router-link href="?tag=${tag}" class="hp_bold">
      #${tag}
    </router-link>
  </li>`;

export const Tags = (tags: string[], tagFilter?: string): string => `
  <ul class="bl_tags">
    ${tags
      .map((tag) => (tag === tagFilter ? MatchedTag(tag) : Tag(tag)))
      .join('')}
  </ul>`;
