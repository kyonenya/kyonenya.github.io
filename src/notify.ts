import { isNew } from './lib/dateUtils';

export function notifyUpdate(): void {
  const modifiedAt = '2022-02-02';
  const newDays = 15;
  const aboutElement = document.getElementById('about');

  if (!isNew(new Date(modifiedAt), newDays)) return;

  aboutElement?.addEventListener('click', () => {
    localStorage.setItem(modifiedAt, 'true');
  });
  if (localStorage.getItem(modifiedAt) !== 'true') {
    aboutElement?.classList.add('el_badge');
  }
}
