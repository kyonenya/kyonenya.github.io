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

d = '2021-12-25T00:00';
x = fromNow(d);
y = fromNow2(d);
z = new Date(d);

//   0 to 44 seconds	s	a few seconds ago
// 45 to 89 seconds	m	a minute ago
// # no 45 seconds ago ok 1 minute ago
//   90 seconds to 44 minutes	mm	2 minutes ago ... 44 minutes ago
// 45 to 89 minutes	h	an hour ago
// # no 45 minutes ok 1 hour ago
//   90 minutes to 21 hours	hh	2 hours ago ... 21 hours ago
// 22 to 35 hours	d	a day ago
// # no 22 hours ok 1 day ago
//   36 hours to 25 days	dd	2 days ago ... 25 days ago
// 26 to 45 days	M	a month ago
// # no 26 days ok 1 month ago
//   46 days to 10 months	MM	2 months ago ... 10 months ago
// 11 months to 17months	y	a year ago
// # no 11 month ok 1 year ago
//   18 months+	yy	2 years ago ... 20 years ago

function fromNow(date) {
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

function formatYMD(date) {
  return shortDateIntl.format(new Date(date)).replace(/\//g, '-');
}

function formatYMDHm(date) {
  return shortDateTimeIntl.format(new Date(date)).replace(/\//g, '-');
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
