import { parseMarkdownLink } from '../lib/ExternalLink';
import { Citation, toCitationMap, Genre } from './citation';
import { isUnpublished } from './citationDate';

const Text = (text: string): string =>
  parseMarkdownLink(
    text.replace(/——(?![^(]*\))/g, '<span class="hp_kerning">——</span>') // kerning except link href
  );

const BoldText = (text: string) => `<b>${Text(text)}</b>`;

const ListItem = (citation: Citation, id?: string) => `
  <li id=${citation.id} class=${
  citation.id.toString() === id ? 'hilightBefore' : ''
}>
    ${(citation.id.toString() === id ? BoldText : Text)(
      citation._bibliographyText
    )}${
  isUnpublished(citation)
    ? citation.type === 'paper-conference'
      ? '［発表予定］'
      : '［刊行予定］'
    : ''
}
  </li>
`;

const List = (
  citations: Citation[] | undefined,
  genre: Genre,
  id?: string
): string => {
  if (!citations || citations.length === 0) return '';
  return `
    <h3>${genre}</h3>
    <ol>
      ${citations.map((citation) => ListItem(citation, id)).join('')}
    </ol>`;
};

export const Works = (citations: Citation[], id?: string): string => {
  const citationMap = toCitationMap(citations);

  return `
    <section class="ly_container">
      <div class="bl_text">
        <h2>業績一覧</h2>
        ${Genre.map((genre) => List(citationMap[genre], genre, id)).join('')}
      </div>
    </section>`;
};
