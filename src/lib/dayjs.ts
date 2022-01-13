import dayjs, { ConfigType, Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ja';

dayjs.extend(relativeTime);
dayjs.locale('ja');

export function formatYMD(date: string): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export function formatYMDHm(date: string): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm');
}

export function isBefore(
  date: string | Dayjs,
  limitDate: string | Dayjs
): boolean {
  return dayjs(date).isBefore(limitDate);
}

export function isPast(date: string): boolean {
  return isBefore(date, dayjs());
}

export function isNew(
  date: ConfigType,
  newDays: number,
  now?: ConfigType
): boolean {
  const limitDate = dayjs(date).add(newDays, 'day');
  return isBefore(dayjs(now), limitDate);
}

export function fromNow(date: string): string {
  return dayjs(date).fromNow();
}
