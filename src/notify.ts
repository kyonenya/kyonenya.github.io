import { isNew } from './lib/dateUtils';

const modifiedAt = '2022-02-02';
const newDays = 15;
  
export function notifyUpdate(): void {
  const aboutElement = document.getElementById('about');

  if (!isNew(new Date(modifiedAt), newDays)) return;

  aboutElement?.addEventListener('click', () => {
    localStorage.setItem(modifiedAt, 'true');
  });
  if (localStorage.getItem(modifiedAt) !== 'true') {
    aboutElement?.classList.add('el_badge');
  }
}
