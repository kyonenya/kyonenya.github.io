import dayjs from './dayjs';

export function isNew(dateStr: string, expirationDays: number, now?: string) {
  const limitDate = dayjs(dateStr).add(expirationDays, 'day');
  return dayjs(now).isBefore(limitDate);
}

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return (await response.json()) as T;
};

export const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return await response.text();
};
