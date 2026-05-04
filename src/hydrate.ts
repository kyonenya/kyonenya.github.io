import { app } from './app';
import { fromNow } from './lib/dateUtils';

function hydrateFromNow() {
  document.querySelectorAll('.bl_posts_dateago').forEach((el) => {
    const dateStr = el.getAttribute('data-date');
    if (!dateStr) return;
    el.textContent = fromNow(new Date(dateStr));
  });
}

hydrateFromNow();

// SSG -> SPA (progressive enhancement)
void app(false);
