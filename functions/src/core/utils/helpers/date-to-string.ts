// src/core/utils/helpers/date-to-string.ts

export function convertDateToString(date: Date, format: string): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  if (format == 'ddmmyyyy') {
    return `${day}/${month}/${year}`;
  } else {
    throw new Error('invalid format');
  }
}
