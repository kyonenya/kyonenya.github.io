import { Data } from 'csl-json';

export type Citation = Data & {
  _bibliographyText: string;
};

export const Category = ['論文', '発表', '翻訳', '書籍'] as const;
export type Category = typeof Category[number];

function detectCategory(item: Citation): Category | undefined {
  switch (item.type) {
  case 'article-journal':
    if (item.translator) return '翻訳';
    return '論文';
    break;
  case 'paper-conference':
    return '発表';
    break;
  case 'book':
    return '書籍';
    break;
  default:
    return undefined;
  }
}

export type CitationMap = Map<Category, Citation[]>;

export function toCitationMap(citations: Citation[]): CitationMap {
  return new Map(
    Category.map((category) => [
      category,
      citations.filter((citation) => detectCategory(citation) === category),
    ])
  );
}
