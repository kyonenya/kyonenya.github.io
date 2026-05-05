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

const msMap: DateParts = {
  seconds,
  minutes,
  hours,
  day,
  month,
  year,
};

export const units = Object.keys(msMap) as (keyof DateParts)[];

export function toUnitTime(ms: number, unit: keyof DateParts): number {
  return ms / msMap[unit];
}

export function getDateParts(date: Date): DateParts {
  return {
    seconds: date.getSeconds(),
    minutes: date.getMinutes(),
    hours: date.getHours(),
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}
