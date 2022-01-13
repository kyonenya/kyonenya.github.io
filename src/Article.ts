import { Tags } from './Tags';
import { formatYMDHm, fromNow } from './lib/dayjs';
import { Post } from './post';

export const Article = (post: Post): string => `
  <article>
    <header class="bl_text_header">
      <time class="bl_text_date">
        ${formatYMDHm(post.createdAt)}
      </time>
    </header>
    <div class="bl_text">
      ${post.title ? `<h1>${post.title}</h1>` : ''}
      ${post.text}
    </div>
    <footer class="bl_text_footer">
      <span class="bl_posts_dateago">
        ${fromNow(post.createdAt)}
      </span>
      <ul class="bl_tags">
        ${Tags(post.tags)}
      </ul>
    </footer>
  </article>`;
