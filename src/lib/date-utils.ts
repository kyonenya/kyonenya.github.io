import { toUnitTime, Unit } from './date-const';

const thresholdMap: { [k in Unit]: number } = {
  second: 45,
  minute: 45,
  hour: 22,
  day: 26,
  month: 11,
  year: Infinity,
};

const relativeTimeIntl = new Intl.RelativeTimeFormat('ja-JP', {
  style: 'narrow',
});

export function fromNow(date: Date): string {
  const diffMs = new Date(date).getTime() - new Date().getTime();
  const unit = Unit.find(
    (unit) =>
      Math.abs(Math.round(toUnitTime(diffMs, unit))) < thresholdMap[unit]
  );
  if (!unit) return '';
  return relativeTimeIntl.format(Math.round(toUnitTime(diffMs, unit)), unit);
}
