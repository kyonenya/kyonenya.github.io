import dayjs from './dayjs';
import { Post } from './post';
import { Page } from './render';
import { hashtag } from './templates';

const article = (post: Post): string => `<article>
    <header class="bl_text_header">
      <time class="bl_text_date"
        datetime="${dayjs(post.date).format('YYYY-MM-DD HH:mm')}"
      >
        ${dayjs(post.date).format('YYYY-MM-DD HH:mm')}
      </time>
    </header>
    <div class="bl_text">
      <h1 class="bl_text_title">${post.title}</h1>
      ${post.text}
    </div>
    <footer class="bl_text_footer">
      <span class="bl_posts_dateago">${dayjs(post.date).fromNow()}</span>
      <ul class="bl_tags">
        ${post.tags.map((aTag) => hashtag(aTag)).join('')}
      </ul>
    </footer>
  </article>`;

export const Article = (post: Post): Page => ({
  body: article(post),
  suffix: ` :: ${post.id}`,
  description: `${post.plainText.substr(0, 110)}…`,
  title: post.title
    ? `${post.title}｜placet experiri :: ${post.id}`
    : `placet experiri :: ${post.id}`,
  archiveHeader: '',
});
