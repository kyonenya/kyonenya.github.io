import { Data } from 'csl-json';

export const Category = ['論文', '発表', '翻訳', '書籍'] as const;
export type Category = typeof Category[number];

function detectCategory(item: Data): Category | undefined {
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

export type Bibliography = {
  text: string;
  category: Category | undefined;
  item: Data;
};

function toBibliographies(texts: string[], items: Data[]): Bibliography[] {
  return texts.map((text, i) => ({
    text,
    category: detectCategory(items[i]),
    item: items[i],
  }));
}

export type BibliographyMap = Map<Category, Bibliography[]>;

export function toBibliographyMap(
  texts: string[],
  items: Data[]
): BibliographyMap {
  const bibs = toBibliographies(texts, items);
  return new Map(
    Category.map((c) => [c, bibs.filter((bib) => bib.category === c)])
  );
}
