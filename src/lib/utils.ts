export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return (await response.json()) as T;
}

export function isDevelopment(locationHref: string): boolean {
  return /localhost:\d+/.test(locationHref);
}

export function toExternalLink(html: string): string {
  return html.replaceAll(
    /<a (href='[^?].+?'.*?)>(.+?)<\/a>/g,
    (_, attributes: string, content: string) =>
      `<a ${attributes} target='_blank' rel='noopener'>${content}</a>`
  );
}

export function parseMarkdownLink(text: string): string {
  return text.replaceAll(
    /\[(.+?)\]\((.+?)\)/g,
    (_, content: string, href: string) =>
      `<a href="${href}" target="_blank" rel="noopener">${content}</a>`
  );
}
