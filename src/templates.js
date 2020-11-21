// import dayjs from 'dayjs';
// import 'dayjs/locale/ja';
// import relativeTime from 'dayjs/plugin/relativeTime';

// dayjs.extend(relativeTime);
dayjs.locale('ja');
dayjs.extend(dayjs_plugin_relativeTime);

const hashtag = aTag => `<li><a href="?tag=${aTag}">#${aTag}</a></li>`;

const matchedHashtag = aTag => `<li><a href="?tag=${aTag}" class="hp_bold">#${aTag}</a></li>`;

const postList = (aData, filteredTag = null, searched = {}) => `
  <li class="bl_posts_item${(searched.isMatched || Object.keys(searched).length === 0) ? '' : ' hp_hidden'}" data-id=${aData.id}>
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
          ${(!searched.isMatched) ? `${aData.plainText.substr(0, 125)}…` : searched.summary}
        </p>
      </div>
    </a>
    <footer class="bl_posts_footer">
      <span class="bl_posts_dateago">${dayjs(aData.date).fromNow()}</span>
      <ul class="bl_tags">
        ${aData.tags.map((aTag) => {
          if (aTag === filteredTag) {
            return matchedHashtag(aTag);
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
        ${aData.tags.map(aTag => hashtag(aTag)).join('')}
      </ul>
    </footer>
  </article>`;

const searchedSummary = aResult => `
  ${aResult.beforeEllipsis}${aResult.beforeText}
  <span class="hp_highlight">
    ${aResult.word}
  </span>
  ${aResult.afterText}${aResult.afterEllipsis}`;

export const templates = {
  postList,
  article,
  searchedSummary,
};
