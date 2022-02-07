import { isNew } from '../lib/dateUtils';
import { Citation } from './citation';

const newDays = 30;

type DateParts = [number, number, number];

function parseDateParts(dateParts: DateParts): Date {
  const [year, month, date] = dateParts;
  return new Date(year, month - 1, date);
}

export function isNewCitation(citation: Citation): boolean | undefined {
  const date = (citation.issued?.['date-parts']?.[0] ??
    citation?.['event-date']?.['date-parts']?.[0]) as DateParts | undefined;
  if (!date) return;
  return isNew(parseDateParts(date), newDays);
}
