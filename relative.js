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

const unitMap = {
  second: [(ms) => ms / Second, 45],
  minute: [(ms) => ms / Minute, 45],
  hour: [(ms) => ms / Hour, 22],
  day: [(ms) => ms / Day, 26],
  month: [(ms) => ms / Month, 11],
  year: [(ms) => ms / Year, 99999],
};
const Unit = Object.keys(unitMap);

const relativeTimeIntl = new Intl.RelativeTimeFormat('ja-JP', {
  style: 'narrow',
});

console.log(fromNow(new Date('2022-01-14')));

function fromNow(date) {
  const diff = new Date(date).getTime() - new Date().getTime();

  const result = Unit.map((unit) => {
    const [fromMs, threshold] = unitMap[unit];
    if (Math.abs(Math.round(fromMs(diff))) < threshold) {
      return relativeTimeIntl.format(Math.round(fromMs(diff)), unit);
    }
  });
  console.log(result); // [ undefined, '11分前', '0時間前', '0日前', '0か月前', '0年前' ]

  const unit = Unit.find((unit) => {
    const [fromMs, threshold] = unitMap[unit];
    return Math.abs(Math.round(fromMs(diff))) < threshold;
  });
  const [fromMs, threshold] = unitMap[unit];
  return relativeTimeIntl.format(Math.round(fromMs(diff)), unit);
}
