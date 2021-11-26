import { Data } from 'csl-json';

export type Bibliography = {
  text: string;
  type: BibType | undefined;
  item: Data;
};

export type BibType = '論文' | '発表' | '翻訳' | '書籍';

function detectBibType(item: Data): BibType | undefined {
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

export function toBibliographies(
  texts: string[],
  items: Data[]
): Bibliography[] {
  return texts.map((text, i) => {
    const item = items[i];

    return {
      text,
      type: detectBibType(item),
      item,
    };
  });
}
