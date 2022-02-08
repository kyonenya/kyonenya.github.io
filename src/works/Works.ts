import { Citation, toCitationMap, Genre } from './citation';
import { isNewCitation } from './citationDate';

const Text = (text: string): string =>
  text
    .replaceAll(
      /\[(.+?)\]\((.+?)\)/g, // markdown link -> external anchorlink
      (_, content: string, href: string) =>
        `<a href="${href}" target="_blank" rel="noopener">${content}</a>`
    )
    .replaceAll(
      '——', // kerning
      '<span class="hp_kerning">——</span>'
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
    <section class="ly_container">
      <div class="bl_text">
        <h2>業績一覧</h2>
        ${Genre.map((genre) => List(citationMap[genre], genre)).join('')}
      </div>
    </section>`;
};
