import { toUnitTime, units, getDateParts, DateParts } from './dateConst';

function pad2(num: number): string {
  return String(num).padStart(2, '0');
}

export function formatYMD(date: Date): string {
  const { year, month, day } = getDateParts(date);
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

export function formatYMDHm(date: Date): string {
  const { year, month, day, hours, minutes } = getDateParts(date);
  return `${year}-${pad2(month)}-${pad2(day)} ${hours}:${pad2(minutes)}`;
}

function isBefore(date: Date, limitDate: Date): boolean {
  return date.getTime() < limitDate.getTime();
}

export function isPast(date: Date): boolean {
  return isBefore(date, new Date());
}

export function isNew(date: Date, newDays: number): boolean {
  const limitDate = date; // clone
  limitDate.setDate(date.getDate() + newDays);
  return isBefore(new Date(), limitDate);
}

const thresholdMap: DateParts = {
  seconds: 45,
  minutes: 45,
  hours: 22,
  day: 26,
  month: 11,
  year: Infinity,
};

const relativeTimeIntl = new Intl.RelativeTimeFormat('ja-JP', {
  style: 'narrow',
});

export function fromNow(date: Date): string {
  const diffMs = date.getTime() - new Date().getTime();
  const unit = units.find(
    (unit) => Math.abs(toUnitTime(diffMs, unit)) < thresholdMap[unit]
  );
  if (!unit) return '';
  return relativeTimeIntl.format(Math.round(toUnitTime(diffMs, unit)), unit);
}
