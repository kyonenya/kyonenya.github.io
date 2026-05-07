// eslint-disable-next-line import/no-unresolved
import { Data } from 'csl-json';

export type Citation = Omit<Data, 'id'> & {
  id: string | number;
  _bibliographyText: string;
};

export const Genre = ['書籍', '学位論文', '論文', '発表', '翻訳'] as const;
export type Genre = (typeof Genre)[number];

function detectGenre(item: Citation): Genre | undefined {
  switch (item.type) {
    case 'book':
      return '書籍';
    case 'article-journal':
      if (item.translator) return '翻訳';
      return '論文';
    case 'paper-conference':
      return '発表';
    case 'thesis':
      return '学位論文';
    default:
      return undefined;
  }
}

type CitationMap = { [k in Genre]: Citation[] };

export const toCitationMap = (citations: Citation[]): CitationMap =>
  Object.fromEntries(
    Genre.map((genre) => [
      genre,
      citations.filter((c) => detectGenre(c) === genre),
    ]),
  ) as CitationMap;
