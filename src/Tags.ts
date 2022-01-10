const Tag = (tag: string): string =>
  `<li>
    <a href="?tag=${tag}" class="hp_unsetLink">
      #${tag}
    </a>
  </li>`;

const MatchedTag = (tag: string): string =>
  `<li>
    <a href="?tag=${tag}" class="hp_unsetLink hp_bold">
      #${tag}
    </a>
  </li>`;

export const Tags = (tags: string[], tagFilter?: string): string =>
  tags.map((tag) => (tag === tagFilter ? MatchedTag(tag) : Tag(tag))).join('');
