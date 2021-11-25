import { Data } from 'csl-json';

export type Bibliography = {
  text: string;
  isTranslation: boolean;
  data: Data;
};

export function toBibliographies(
  texts: string[],
  items: Data[]
): Bibliography[] {
  return texts.map((text, i) => {
    const data = items[i];

    return {
      text,
      isTranslation: !!data.translator,
      data,
    };
  });
}
