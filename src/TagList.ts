const Tag = (tag: string): string => `#${tag}`;

const StrongTag = (tag: string): string => `<strong>${Tag(tag)}</strong>`;

export const TagListItem = (tag: string, tagFilter?: string): string => `
  <li>
    <a href="?tag=${tag}" class="hp_unsetLink">
      ${tag === tagFilter ? StrongTag(tag) : Tag(tag)}
    </a>
  </li>`;

export const TagList = (tags: string[], tagFilter?: string): string => `
  <ul class="bl_tagList">
    ${tags.map((tag) => TagListItem(tag, tagFilter)).join('')}
  </ul>
`;
