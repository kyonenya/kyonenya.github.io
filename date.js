const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
require('dayjs/locale/ja');

dayjs.extend(relativeTime);
dayjs.locale('ja');

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

d = '2021-12-24 12:00';
x = fromNow(d);
y = fromNow2(d);
z = new Date(d);

function formatYMD(date) {
  return shortDateIntl.format(date).replace(/\//g, '-');
}

function formatYMDHm(date) {
  return shortDateTimeIntl.format(date).replace(/\//g, '-');
}

function isBefore(date, limitDate) {
  return new Date(date) < new Date(limitDate);
}

function isPast(date) {
  return isBefore(date, new Date());
}

function isNew(date, newDays) {
  const _date = new Date(date);
  _date.setDate(_date.getDate() + newDays); // limitDate
  return isBefore(new Date(), _date);
}

function fromNow(date) {
  return relativeTimeIntl.format(-21, 'days');
}

// ---

function formatYMD2(date) {
  return dayjs(date).format('YYYY-MM-DD');
}

function formatYMDHm2(date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm');
}

function isBefore2(date, limitDate) {
  return dayjs(date).isBefore(limitDate);
}

function isPast2(date) {
  return isBefore2(date, dayjs());
}

function isNew2(date, newDays) {
  const limitDate = dayjs(date).add(newDays, 'day');
  return isBefore(dayjs(), limitDate);
}

function fromNow2(date) {
  return dayjs(date).fromNow();
}

console.log(x);
console.log(y);
console.log(z);
