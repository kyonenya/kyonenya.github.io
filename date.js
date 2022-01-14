let d;
let x;
let y;
let z;

const shortDateIntl = new Intl.DateTimeFormat('ja-JP', { dateStyle: 'short' });
const shortDateTimeIntl = new Intl.DateTimeFormat('ja-JP', {
  dateStyle: 'short',
  timeStyle: 'short',
});
const relativeTimeIntl = new Intl.RelativeTimeFormat('ja-JP', {
  style: 'narrow',
});

const Second = 1000;
const Minute = Second * 60;
const Hour = Minute * 60;
const Day = Hour * 24;
const Week = Day * 7;
const Month = Day * 30;
const Year = Day * 365;

const second = (ms) => ms / Second;
const minute = (ms) => ms / Minute;
const hour = (ms) => ms / Hour;
const day = (ms) => ms / Day;
const month = (ms) => ms / Month;
const year = (ms) => ms / Year;

function className(...classes) {
  return classes.map((c) => (c === false ? '' : c)).join(' ');
}

d = className('hp_bold', true && 'hp_highlight');

console.log(d);
console.log(false && 'hp_highlight');
