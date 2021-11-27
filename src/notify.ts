import { isNew } from './utils';

const modifiedAt = '2021-11-27';
const expirationDays = 30;
const aboutElement = document.getElementById('about')!;

export const notifyUpdate = (): void => {
  if (!isNew(modifiedAt, 30)) return;

  aboutElement.addEventListener('click', () => {
    localStorage.setItem(modifiedAt, 'true');
  });
  if (localStorage.getItem(modifiedAt) !== 'true') {
    aboutElement.classList.add('el_badge');
  }
};
