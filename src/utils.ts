import { ConfigType } from 'dayjs';
import dayjs from './dayjs';

export function isNew(
  date: ConfigType,
  newDays: number,
  now?: string
): boolean {
  const limitDate = dayjs(date).add(newDays, 'day');
  return dayjs(now).isBefore(limitDate);
}

export async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return (await response.json()) as T;
}
