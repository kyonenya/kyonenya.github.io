import { TagList } from './TagList';
import { toExternalLink } from './lib/ExternalLink';
import { MarkupText, kerningDoubleDash } from './lib/MarkupText';
import { formatYMDHm, formatYMD, fromNow } from './lib/dateUtils';
import type { Post } from './post';
import { baseUrl, type Page } from './render';

const Article = (post: Post, ssg?: boolean): string => `
  <section class="ly_container">
    <article>
      <header class="bl_text_header">
        <time class="bl_text_date">
          ${formatYMDHm(post.createdAt)}
        </time>
      </header>
      <div class="bl_text">
        ${post.title ? `<h1>${kerningDoubleDash(post.title)}</h1>` : ''}
        ${MarkupText(toExternalLink(post.text))}
      </div>
      <footer class="bl_text_footer">
        <span class="bl_posts_dateago" data-date="${post.createdAt.toISOString()}">
          ${ssg ? formatYMD(post.createdAt) : fromNow(post.createdAt)}
        </span>
        ${TagList(post.tags)}
      </footer>
    </article>
  </section>`;

export const articlePage = (post: Post, ssg?: boolean): Page => ({
  body: Article(post, ssg),
  title: post.title
    ? `${post.title}｜placet experiri :: ${post.id}`
    : `placet experiri :: ${post.id}`,
  suffix: ` :: ${post.id}`,
  description: `${post.plainText.substring(0, 110)}…`,
  href: `${baseUrl}posts/${post.id}`,
});
