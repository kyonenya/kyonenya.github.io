import { baseUrl} from './lib/render';

const Tag = (tag: string): string => `#${tag}`;

export const TagListItem = (tag: string, tagFilter?: string, ssg?: boolean): string => `
  <li>
    <a href="${ssg ? baseUrl : ''}?tag=${tag}" class="hp_unsetLink">
      ${tag === tagFilter ? `<b>${Tag(tag)}</b>` : Tag(tag)}
    </a>
  </li>`;

export const TagList = (tags: string[], tagFilter?: string, ssg?: boolean): string => `
  <ul class="el_tagList">
    ${tags.map((tag) => TagListItem(tag, tagFilter, ssg)).join('')}
  </ul>
`;
