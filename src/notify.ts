import { isNew } from './utils';

const modifiedAt = '2021-11-27';
const newDays = 30;
const aboutElement = document.getElementById('about');

export function notifyUpdate(): void {
  if (!isNew(modifiedAt, newDays)) return;

  aboutElement?.addEventListener('click', () => {
    localStorage.setItem(modifiedAt, 'true');
  });
  if (localStorage.getItem(modifiedAt) !== 'true') {
    aboutElement?.classList.add('el_badge');
  }
}
