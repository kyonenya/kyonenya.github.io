const Tag = (tag: string): string => `#${tag}`;

export const TagListItem = (tag: string, tagFilter?: string): string => `
  <li>
    <a href="?tag=${tag}" class="hp_unsetLink">
      ${tag === tagFilter ? `<b>${Tag(tag)}</b>` : Tag(tag)}
    </a>
  </li>`;

export const TagList = (tags: string[], tagFilter?: string): string => `
  <ul class="el_tagList">
    ${tags.map((tag) => TagListItem(tag, tagFilter)).join('')}
  </ul>
`;
