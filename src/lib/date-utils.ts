import { toUnitTime, Unit } from './date-const';

const shortDateIntl = new Intl.DateTimeFormat('ja-JP', { dateStyle: 'short' });
const shortDateTimeIntl = new Intl.DateTimeFormat('ja-JP', {
  dateStyle: 'short',
  timeStyle: 'short',
});
const relativeTimeIntl = new Intl.RelativeTimeFormat('ja-JP', {
  style: 'narrow',
});

export function formatYMD(date: Date): string {
  return shortDateIntl.format(date).replaceAll('/', '-');
}

export function formatYMDHm(date: Date): string {
  return shortDateTimeIntl.format(date).replaceAll('/', '-');
}

function isBefore(date: Date, limitDate: Date): boolean {
  return new Date(date).getTime() < new Date(limitDate).getTime();
}

export function isPast(date: Date): boolean {
  return isBefore(date, new Date());
}

export function isNew(date: Date, newDays: number): boolean {
  const _date = new Date(date);
  _date.setDate(_date.getDate() + newDays); // limitDate
  return isBefore(new Date(), _date);
}

const thresholdMap: { [k in Unit]: number } = {
  second: 45,
  minute: 45,
  hour: 22,
  day: 26,
  month: 11,
  year: Infinity,
};

export function fromNow(date: Date): string {
  const diffMs = new Date(date).getTime() - new Date().getTime();
  const unit = Unit.find(
    (unit) =>
      Math.abs(Math.round(toUnitTime(diffMs, unit))) < thresholdMap[unit]
  );
  if (!unit) return '';
  return relativeTimeIntl.format(Math.round(toUnitTime(diffMs, unit)), unit);
}
