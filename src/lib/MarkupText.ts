/* eslint-disable no-irregular-whitespace */
export const MarkupText = (html: string): string =>
  html
    // kerning of double dash
    .replaceAll('——', '<span class="hp_kerning">——</span>')
    // full-width space -> half-width space after (！|？)
    .replaceAll(/([！？])　/g, (_, token: string) => `${token} `)
    // overwrite external link
    .replaceAll(
      /<a (href='[^?].+?'.*?)>(.+?)<\/a>/g,
      (_, attributes: string, content: string) =>
        `<a ${attributes} target='_blank' rel='noopener'>${content}</a>`
    )
    // unset paragraph indent start with '「'
    .replaceAll(
      /<p>([「『（].+?)<\/p>/g,
      (_, content: string) => `<p style='text-indent: 0'>${content}</p>`
    );
