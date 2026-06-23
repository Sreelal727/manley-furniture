// Small date helpers for the calendar (no external date library).

/** Local YYYY-MM-DD string (avoids UTC shifting from toISOString). */
export function ymd(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export function parseYmd(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

export function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1)
}

/** Sunday of the week containing d. */
export function startOfWeek(d: Date): Date {
  return addDays(d, -d.getDay())
}

export function sameDay(a: Date, b: Date): boolean {
  return ymd(a) === ymd(b)
}

/** 6×7 matrix of days covering the month that d falls in. */
export function monthMatrix(d: Date): Date[][] {
  const first = new Date(d.getFullYear(), d.getMonth(), 1)
  const start = startOfWeek(first)
  const weeks: Date[][] = []
  let cursor = start
  for (let w = 0; w < 6; w++) {
    const row: Date[] = []
    for (let i = 0; i < 7; i++) {
      row.push(cursor)
      cursor = addDays(cursor, 1)
    }
    weeks.push(row)
  }
  return weeks
}

/** Sunday … Saturday for the week containing d. */
export function weekDays(d: Date): Date[] {
  const start = startOfWeek(d)
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

export const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
