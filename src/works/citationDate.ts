import { Citation } from './citation';

type DateParts = [number, number, number];

function parseDateParts(dateParts: DateParts): Date {
  const [year, month, date] = dateParts;
  return new Date(year, month - 1, date);
}

export function isUnpublished(citation: Citation): boolean | undefined {
  const dateParts = (citation.issued?.['date-parts']?.[0] ??
    citation['event-date']?.['date-parts']?.[0]) as DateParts | undefined;
  if (!dateParts) return;

  return new Date() < parseDateParts(dateParts);
}
