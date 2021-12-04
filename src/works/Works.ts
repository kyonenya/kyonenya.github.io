import { Citation, toCitationMap, Genre } from './citation';
import { isNewCitation } from './citation-date';

const Text = (text: string): string =>
  text
    .replaceAll(
      /\[(.+?)\]\((.+?)\)/g,
      (_match, title: string, url: string) => `<a href="${url}">${title}</a>`
    )
    .replaceAll('——', '<span class="hp_kerning">——</span>');

const Item = (text: string): string => `<li>${Text(text)}</li>`;

const HilightedItem = (text: string): string =>
  `<strong>${Item(text)}</strong>`;

const List = (citations: Citation[] | undefined, genre: Genre): string => {
  if (!citations || citations.length === 0) return '';
  return `
    <h3>${genre}</h3>
    <ol>
      ${citations
        .map((citation) =>
          (isNewCitation(citation) ? HilightedItem : Item)(
            citation._bibliographyText
          )
        )
        .join('')}
    </ol>`;
};

export const Works = (citations: Citation[]): string => {
  const citationMap = toCitationMap(citations);

  return `
    <section class="ly_cont">
    <div class="bl_text">
      <h2>業績一覧</h2>
      ${Genre.map((g) => List(citationMap.get(g), g)).join('')}
    </div>`;
};
