import { Tags } from './Tags';
import dayjs from './lib/dayjs';
import { Post } from './post';

export const Article = (post: Post): string => `
  <article>
    <header class="bl_text_header">
      <time class="bl_text_date">
        ${dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')}
      </time>
    </header>
    <div class="bl_text">
      ${
        post.title
          ? `<h1>${post.title}</h1>`
          : ''
      }
      ${post.text}
    </div>
    <footer class="bl_text_footer">
      <span class="bl_posts_dateago">
        ${dayjs(post.createdAt).fromNow()}
      </span>
      <ul class="bl_tags">
        ${Tags(post.tags)}
      </ul>
    </footer>
  </article>`;
