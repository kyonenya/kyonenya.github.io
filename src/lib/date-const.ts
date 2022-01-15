const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const year = month * 12;

const msMap = {
  second,
  minute,
  hour,
  day,
  month,
  year,
};

export const Unit = Object.keys(msMap) as (keyof typeof msMap)[];
export type Unit = typeof Unit[number];

export function toUnitTime(ms: number, unit: Unit): number {
  return ms / msMap[unit];
}
