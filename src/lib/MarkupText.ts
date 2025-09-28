/* eslint-disable no-irregular-whitespace */
export const MarkupText = (html: string): string =>
  html
    // double dash -> double ruled line
    .replaceAll('——', '──')
    // full-width space -> half-width space after (！|？)
    .replaceAll(/([！？])　/g, (_, token: string) => `${token} `)
    // unset paragraph indent start with brackets
    .replaceAll(
      /<p>([「『（].+?)<\/p>/g,
      (_, content: string) => `<p style="text-indent: 0">${content}</p>`
    );

export const kerningDoubleDash = (text: string): string =>
  text.replace(/——(?![^(]*\))/g, '<span class="hp_kerning">——</span>'); // kerning except link href;
