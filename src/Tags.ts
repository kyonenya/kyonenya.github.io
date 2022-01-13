const Tag = (tag: string, isMatched?: boolean): string =>
  `<li>
    <a href="?tag=${tag}" class="hp_unsetLink ${isMatched ? 'hp_bold' : ''}">
      #${tag}
    </a>
  </li>`;

export const Tags = (tags: string[], tagFilter?: string): string =>
  tags.map((tag) => Tag(tag, tag === tagFilter)).join('');
