import { parseMarkdownLink } from '../lib/ExternalLink';
import { Citation, toCitationMap, Genre } from './citation';
import { isNewCitation } from './citationDate';

const Text = (text: string): string =>
  parseMarkdownLink(
    text.replace(/——(?![^\(]*\))/g, '<span class="hp_kerning">——</span>') // kerning except link href
    );

const BoldText = (text: string) => `<b>${Text(text)}</b>`;

const ListItem = (citation: Citation) => `
  <li>
    ${(isNewCitation(citation) ? BoldText : Text)(citation._bibliographyText)}
  </li>
`;

const List = (citations: Citation[] | undefined, genre: Genre): string => {
  if (!citations || citations.length === 0) return '';
  return `
    <h3>${genre}</h3>
    <ol>
      ${citations.map((citation) => ListItem(citation)).join('')}
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
