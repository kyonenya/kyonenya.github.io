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
  const updatedAt = getUpdatedAt(notices);

  if (!updatedAt || !isNew(new Date(updatedAt), newDays)) return;

  document.getElementById('about')?.addEventListener('click', () => {
    localStorage.setItem(updatedAt, 'true');
  });
  if (localStorage.getItem(updatedAt) !== 'true') {
    document.getElementById('about')?.classList.add('el_badge');
  }
}
