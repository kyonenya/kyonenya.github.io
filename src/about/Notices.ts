import { parseMarkdownLink, resolveExternalLinks } from '../lib/Link';
import { kerningDoubleDash } from '../lib/MarkupText';
import type { Notice } from '../notify';

const NoticeItem = ({ date, body }: Notice): string => `
  <li class="bl_postList_item">
    <header class="bl_postList_header">
      <time class="bl_postList_date">${date}</time>
    </header>
    <div class="bl_text">
      ${resolveExternalLinks(parseMarkdownLink(kerningDoubleDash(body)))}
    </div>
  </li>
`;

export const Notices = (notices: Notice[]): string =>
  notices.map((notice) => NoticeItem(notice)).join('');
