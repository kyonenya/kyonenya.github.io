import { MarkupText } from '../lib/MarkupText';
import { parseMarkdownLink } from '../lib/utils';
import { Citation, toCitationMap, Genre } from './citation';
import { isNewCitation } from './citationDate';

const Text = (text: string): string => MarkupText(parseMarkdownLink(text));

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
