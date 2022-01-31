import { toClassName } from './lib/utils';

const Tag = (tag: string, isMatched?: boolean): string =>
  `<li>
    <a href="?tag=${tag}" class="${toClassName(
    'hp_unsetLink',
    isMatched && 'hp_bold'
  )}">
      #${tag}
    </a>
  </li>`;

export const Tags = (tags: string[], tagFilter?: string): string =>
  tags.map((tag) => Tag(tag, tag === tagFilter)).join('');

export const TagList = (tags: string[], tagFilter?: string): string => `
  <ul class="bl_tags">
    ${Tags(tags, tagFilter)}
  </ul>
`;
