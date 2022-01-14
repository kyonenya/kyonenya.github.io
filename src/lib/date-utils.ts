const Second = 1000;
const Minute = Second * 60;
const Hour = Minute * 60;
const Day = Hour * 24;
const Week = Day * 7;
const Month = Day * 30;
const Year = Day * 365;

const Unit = ['second', 'minute', 'hour', 'day', 'month', 'year'] as const;
type Unit = typeof Unit[number];

type UnitMap = {
  [k in Unit]: { threshold: number; fromMs: (ms: number) => number };
};
const unitMap: UnitMap = {
  second: { threshold: 45, fromMs: (ms: number) => ms / Second },
  minute: { threshold: 45, fromMs: (ms: number) => ms / Minute },
  hour: { threshold: 22, fromMs: (ms: number) => ms / Hour },
  day: { threshold: 26, fromMs: (ms: number) => ms / Day },
  month: { threshold: 11, fromMs: (ms: number) => ms / Month },
  year: { threshold: 99999 /* TODO */, fromMs: (ms: number) => ms / Year },
};

const relativeTimeIntl = new Intl.RelativeTimeFormat('ja-JP', {
  style: 'narrow',
});

export function fromNow(date: Date): string {
  const diffMs = new Date(date).getTime() - new Date().getTime();
  const unit = Unit.find((unit) => {
    const { threshold, fromMs } = unitMap[unit];
    return Math.abs(Math.round(fromMs(diffMs))) < threshold;
  });
  if (!unit) return '';
  const { fromMs } = unitMap[unit];
  return relativeTimeIntl.format(Math.round(fromMs(diffMs)), unit);
}
