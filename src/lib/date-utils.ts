const Second = 1000;
const Minute = Second * 60;
const Hour = Minute * 60;
const Day = Hour * 24;
const Week = Day * 7;
const Month = Day * 30;
const Year = Day * 365;

const second = (ms: number) => ms / Second;
const minute = (ms: number) => ms / Minute;
const hour = (ms: number) => ms / Hour;
const day = (ms: number) => ms / Day;
const month = (ms: number) => ms / Month;
const year = (ms: number) => ms / Year;

const msMap = {
  second: (ms: number) => ms / Second,
  minute: (ms: number) => ms / Minute,
  hour: (ms: number) => ms / Hour,
  day: (ms: number) => ms / Day,
  month: (ms: number) => ms / Month,
  year: (ms: number) => ms / Year,
};

const relativeTimeIntl = new Intl.RelativeTimeFormat('ja-JP', {
  style: 'narrow',
});

function fromNow(date: Date) {
  const diff = new Date(date).getTime() - new Date().getTime();

  if (Math.abs(Math.round(second(diff))) < 45) {
    return relativeTimeIntl.format(Math.round(second(diff)), 'second');
  }
  if (Math.abs(Math.round(minute(diff))) < 45) {
    return relativeTimeIntl.format(Math.round(minute(diff)), 'minute');
  }
  if (Math.abs(Math.round(hour(diff))) < 22) {
    return relativeTimeIntl.format(Math.round(hour(diff)), 'hour');
  }
  if (Math.abs(Math.round(day(diff))) < 26) {
    return relativeTimeIntl.format(Math.round(day(diff)), 'day');
  }
  if (Math.abs(Math.round(month(diff))) < 11) {
    console.log(month(diff));
    return relativeTimeIntl.format(Math.round(month(diff)), 'month');
  }
  return relativeTimeIntl.format(Math.round(year(diff)), 'year');
}
