import { parseMarkdownLink } from '../lib/ExternalLink';
import { Citation, toCitationMap, Genre } from './citation';
import { isUnpublished } from './citationDate';

const Text = (text: string): string =>
  parseMarkdownLink(
    text.replace(/——(?![^(]*\))/g, '<span class="hp_kerning">——</span>') // kerning except link href
  );

const BoldText = (text: string) => `<b>${Text(text)}</b>`;

const ListItem = (citation: Citation, num: number, id?: string): string => {
  const isHighlighted = citation.id.toString() === id;
  const ListNum = isHighlighted
    ? `<a href="?" class="el_olNum hp_highlight hp_unsetLink"><b>${num}.</b></a>`
    : `<span class="el_olNum">${num}.</span>`;
  const statusNote = isUnpublished(citation)
    ? citation.type === 'paper-conference'
      ? '［発表予定］'
      : '［刊行予定］'
    : '';

  return `
    <li id="${citation.id}">
      ${ListNum}
      ${(isHighlighted ? BoldText : Text)(
        citation._bibliographyText
      )}${statusNote}
    </li>
  `;
};

const List = (
  citations: Citation[] | undefined,
  genre: Genre,
  id?: string
): string => {
  if (!citations || citations.length === 0) return '';
  return `
    <h3>${genre}</h3>
    <ol>
      ${citations.map((citation, i) => ListItem(citation, i + 1, id)).join('')}
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
