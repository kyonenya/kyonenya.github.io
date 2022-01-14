export const Unit = [
  'second',
  'minute',
  'hour',
  'day',
  'month',
  'year',
] as const;
export type Unit = typeof Unit[number];

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 7;
const year = day * 30;

const msMap: { [k in Unit]: number } = {
  second,
  minute,
  hour,
  day,
  month,
  year,
};

export function toUnitTime(ms: number, unit: Unit) {
  return ms / msMap[unit];
}
