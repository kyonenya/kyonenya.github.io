// eslint-disable-next-line import/no-unresolved
import { LooseNumber } from 'csl-json';
import dayjs from '../lib/dayjs';
import { isNew } from '../lib/utils';
import { Citation } from './citation';

const newDays = 30;

// prettier-ignore
type DateParts = [LooseNumber, (LooseNumber | undefined)?, (LooseNumber | undefined)?];

// prettier-ignore
function parseDateParts(dateParts: DateParts): Date {
  const sanitizedDateParts = dateParts
    .filter((dp): dp is LooseNumber => dp != null)
    .map((dp) => (typeof dp === 'number' ? dp : parseInt(dp, 10))) as [number, number?, number?];
  return dayjs(sanitizedDateParts).toDate();
}

export function isNewCitation(citation: Citation): boolean | undefined {
  const date = citation?.issued?.['date-parts']?.[0];
  if (!date) return;
  return isNew(parseDateParts(date), newDays);
}
