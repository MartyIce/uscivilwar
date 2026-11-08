/**
 * Parse a "YYYY-MM-DD" date string as a local date.
 *
 * `new Date("1861-04-12")` is parsed as UTC midnight, so formatting it in a
 * US timezone shows the previous day. Use this for any date shown to the user.
 */
export function parseLocalDate(dateStr: string): Date {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
    ? new Date(`${dateStr}T00:00:00`)
    : new Date(dateStr);
}
