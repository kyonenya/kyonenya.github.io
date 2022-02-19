import { TagList } from './TagList';
import { MarkupText } from './lib/MarkupText';
import { formatYMDHm, fromNow } from './lib/dateUtils';
import { toExternalLink } from './lib/utils';
import { Post } from './post';

export const Article = (post: Post): string => `
  <section class="ly_container">
    <article>
      <header class="bl_text_header">
        <time class="bl_text_date">
          ${formatYMDHm(post.createdAt)}
        </time>
      </header>
      <div class="bl_text">
        ${post.title ? `<h1>${post.title}</h1>` : ''}
        ${MarkupText(toExternalLink(post.text))}
      </div>
      <footer class="bl_text_footer">
        <span class="bl_posts_dateago">
          ${fromNow(post.createdAt)}
        </span>
        ${TagList(post.tags)}
      </footer>
    </article>
  </section>`;
