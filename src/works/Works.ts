import { isNew } from '../utils';
import { Citation, CitationMap, toCitationMap, Category } from './bibliography';

const Text = (text: string) =>
  text.replace(
    /\[(.+?)\]\((.+?)\)/g,
    (_match, title, url) => `<a href="${url}">${title}</a>`
  );

const Item = (text: string) => `<li>${Text(text)}</li>`;

const HilightedItem = (text: string) => `<string>${Item(text)}</strong>`;

const List = (
  citations: Citation[] | undefined,
  category: Category
): string => {
  if (!citations || citations.length === 0) return '';
  return `
    <h3>${category}</h3>
    <ol>
      ${citations.map((citation) => Item(citation._bibliographyText)).join('')}
    </ol>`;
};

export const Works = (citations: Citation[]): string => {
  const citationMap = toCitationMap(citations);

  return `
  <section class="ly_cont">
  <div class="bl_text">
    <h2>業績一覧</h2>
    ${Category.map((c) => List(citationMap.get(c), c)).join('')}
  </div>`;
};
