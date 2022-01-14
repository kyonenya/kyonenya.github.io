import dayjs, { ConfigType, Dayjs } from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

function isBefore(
  date: string | Dayjs | Date,
  limitDate: string | Dayjs
): boolean {
  return dayjs(date).isBefore(limitDate);
}

export function isPast(date: string | Date): boolean {
  return isBefore(new Date(date), dayjs());
}

export function isNew(
  date: ConfigType,
  newDays: number,
  now?: ConfigType
): boolean {
  const limitDate = dayjs(date).add(newDays, 'day');
  return isBefore(dayjs(now), limitDate);
}
