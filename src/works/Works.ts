import { Bibliography, BibliographyMap, Category } from './bibliography';

const Item = (text: string) => `<li>${text}</li>`;

const List = (bibs: Bibliography[] | undefined, category: Category): string => {
  if (!bibs || bibs.length === 0) return '';
  return `
    <h3>${category}</h3>
    <ol>
      ${bibs.map((bib) => Item(bib.text)).join('')}
    </ol>`;
};

export const Works = (bibMap: BibliographyMap): string => `
  <section class="ly_cont">
  <div class="bl_text">
    <h2>業績一覧</h2>
    ${Category.map((c) => List(bibMap.get(c), c)).join('')}
  </div>`;
