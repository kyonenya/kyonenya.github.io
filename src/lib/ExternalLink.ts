const ExternalLink = (props: {
  href: string;
  content: string;
  attributes?: string;
}): string => {
  const { href, content, attributes = '' } = props;
  return `<a href="${href}" target="_blank" rel="noopener" ${attributes}>${content}</a>`;
};

export function toExternalLink(html: string): string {
  return html.replaceAll(
    /<a href=['"]([^?].+?)['"](.*?)>(.+?)<\/a>/g, // href start with '?'
    (_, href: string, attributes: string, content: string) =>
      ExternalLink({ href, attributes, content })
  );
}

export function parseMarkdownLink(
  text: string,
  contentModifier = (content: string) => content
): string {
  return text.replaceAll(
    /\[(.+?)\]\((.+?)\)/g,
    (_, content: string, href: string) =>
      ExternalLink({ content: contentModifier(content), href })
  );
}
