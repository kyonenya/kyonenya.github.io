import { isNew } from './lib/dateUtils';

export type Notice = {
  date: string;
  body: string;
  pinned?: boolean;
};

export const getUpdatedAt = (notices: Notice[]): string | undefined =>
  notices
    .map(({ date }) => date)
    .sort()
    .at(-1);

const newDays = 90;

export function notifyUpdate(notices: Notice[]): void {
  const aboutElement = document.getElementById('about');
  const updatedAt = getUpdatedAt(notices);

  if (!updatedAt || !isNew(new Date(updatedAt), newDays)) return;

  aboutElement?.addEventListener('click', () => {
    localStorage.setItem(updatedAt, 'true');
  });
  if (localStorage.getItem(updatedAt) !== 'true') {
    aboutElement?.classList.add('el_badge');
  }
}
