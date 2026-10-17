export type DateParts = {
  seconds: number;
  minutes: number;
  hours: number;
  day: number;
  month: number;
  year: number;
};

const seconds = 1000; // ms
const minutes = seconds * 60;
const hours = minutes * 60;
const day = hours * 24;
const month = day * 30;
const year = month * 12;

const unitMsMap: DateParts = {
  seconds,
  minutes,
  hours,
  day,
  month,
  year,
};

type Unit = keyof DateParts;
export const units = Object.keys(unitMsMap) as Unit[];

export function toUnitTime(ms: number, unit: Unit): number {
  return ms / unitMsMap[unit];
}

export function getDateParts(date: Date): DateParts {
  const jst = new Date(date.getTime() + 9 * hours); // regardless of runtime timezone
  return {
    seconds: jst.getUTCSeconds(),
    minutes: jst.getUTCMinutes(),
    hours: jst.getUTCHours(),
    day: jst.getUTCDate(),
    month: jst.getUTCMonth() + 1,
    year: jst.getUTCFullYear(),
  };
}
