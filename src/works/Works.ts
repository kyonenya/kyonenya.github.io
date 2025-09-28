import { parseMarkdownLink } from '../lib/ExternalLink';
import { kerningDoubleDash } from '../lib/MarkupText';
import { Citation, toCitationMap, Genre } from './citation';
import { isUnpublished } from './citationDate';

const Text = (text: string): string =>
  parseMarkdownLink(kerningDoubleDash(text));

const BoldText = (text: string) => `<b>${Text(text)}</b>`;

const ListItem = (citation: Citation, num: number, hilightedId: string): string => {
  const isHighlighted = citation.id.toString() === hilightedId;
  const ListNum = isHighlighted
    ? `<a href="?" class="el_olNum hp_highlight hp_unsetLink"><b>${num}.</b></a>`
    : `<a href="#${citation.id}" class="el_olNum hp_unsetLink">${num}.</a>`;
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
  hilightedId: string
): string => {
  if (!citations || citations.length === 0) return '';
  return `
    <h3>${genre}</h3>
    <ol>
      ${citations.map((citation, i) => ListItem(citation, i + 1, hilightedId)).join('')}
    </ol>`;
};

export const Works = (citations: Citation[], hilightedId: string): string => {
  const citationMap = toCitationMap(citations);

  return `
    <section class="ly_container">
      <div class="bl_text">
        <h2>業績一覧</h2>
        ${Genre.map((genre) => List(citationMap[genre], genre, hilightedId)).join('')}
      </div>
    </section>`;
};
