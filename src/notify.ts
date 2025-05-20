import { isNew } from './lib/dateUtils';

export type Update = {
  updatedAt: string;
  newDays: number;
};

export function notifyUpdate(props: Update): void {
  const aboutElement = document.getElementById('about');

  if (!isNew(new Date(props.updatedAt), props.newDays)) return;

  aboutElement?.addEventListener('click', () => {
    localStorage.setItem(props.updatedAt, 'true');
  });
  if (localStorage.getItem(props.updatedAt) !== 'true') {
    aboutElement?.classList.add('el_badge');
  }
}
