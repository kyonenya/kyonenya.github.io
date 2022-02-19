import { parseMarkdownLink } from '../lib/ExternalLink';
import { MarkupText } from '../lib/MarkupText';
import { Citation, toCitationMap, Genre } from './citation';
import { isNewCitation } from './citationDate';

const Text = (text: string): string => MarkupText(parseMarkdownLink(text));

const StrongText = (text: string) =>
  `<span class='hp_bold'>${Text(text)}</span>`;

const Item = (text: string) => `<li>${Text(text)}</li>`;

const HilightedItem = (text: string): string => `<li>${StrongText(text)}</li>`;

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
