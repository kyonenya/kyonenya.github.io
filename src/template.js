dayjs.locale('ja');
dayjs.extend(dayjs_plugin_relativeTime);

const postList = (aData, filteredTag = null) => `
  <li class="bl_posts_item" data-id=${aData.id}>
    <a href="?id=${aData.id}">
      <header class="bl_posts_header">
        <time class="bl_posts_date" datetime="${dayjs(aData.date).format('YYYY-MM-DD HH:mm')}">${dayjs(aData.date).format('YYYY-MM-DD')}
        </time>
      </header>
      <h2 class="bl_posts_title">
        ${aData.title}
      </h2>
      <div class="bl_posts_summary" data-id=${aData.id}>
        <p>
          ${aData.plainText.length > 125
            ? `${aData.plainText.substr(0, 125)}…`
            : aData.plainText}
        </p>
      </div>
    </a>
    <footer class="bl_posts_footer">
      <span class="bl_posts_dateago">${dayjs(aData.date).fromNow()}</span>
      <ul class="bl_tags">
        ${aData.tags.map(aTag => {
          if (aTag === filteredTag) {
            return filteredHashtag(aTag);
          }
          return hashtag(aTag);
        }).join('')}
      </ul>
    </footer>
  </li>`;

const article = aData => `
    <article>
      <header class="bl_text_header">
        <time class="bl_text_date" datetime="${dayjs(aData.date).format('YYYY-MM-DD HH:mm')}">${dayjs(aData.date).format('YYYY-MM-DD HH:mm')}
        </time>
      </header>
      <div class="bl_text">
        <h2 class="bl_text_title">${aData.title}</h2>
        ${aData.text}
      </div>
      <footer class="bl_text_footer">
        <span class="bl_posts_dateago">${dayjs(aData.date).fromNow()}</span>
        <ul class="bl_tags">
          ${aData.tags.map(aTag => template.hashtag(aTag)).join('')}
        </ul>
      </footer>
    </article>`;

const hashtag = aTag => `<li><a href="?tag=${aTag}">#${aTag}</a></li>`;

const filteredHashtag = aTag => `<li><a href="?tag=${aTag}" class="hp_bold">#${aTag}</a></li>`;

export const template = {
  postList,
  article,
  hashtag,
  filteredHashtag,
};
