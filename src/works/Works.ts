import { Citation, toCitationMap, Genre } from './citation';
import { isNewCitation } from './citation-date';

const Text = (text: string): string =>
  text
    .replaceAll(
      /\[(.+?)\]\((.+?)\)/g, // markdown link -> external anchorlink
      (_, linkText: string, href: string) =>
        `<a href="${href}" target="_blank" rel="noopener">${linkText}</a>`
    )
    .replaceAll(
      '——', // kerning
      '<span style="letter-spacing: -0.27em; margin: 0 0.17em 0 0;">——</span>'
    );

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
      ${Genre.map((genre) => List(citationMap[genre], genre)).join('')}
    </div>`;
};
