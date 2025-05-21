import { isNew } from './lib/dateUtils';

export type Update = {
  updatedAt: string;
  newDays: number;
};

export function notifyUpdate({ updatedAt, newDays }: Update): void {
  const aboutElement = document.getElementById('about');

  if (!isNew(new Date(updatedAt), newDays) || newDays <= 0) return;

  aboutElement?.addEventListener('click', () => {
    localStorage.setItem(updatedAt, 'true');
  });
  if (localStorage.getItem(updatedAt) !== 'true') {
    aboutElement?.classList.add('el_badge');
  }
}
