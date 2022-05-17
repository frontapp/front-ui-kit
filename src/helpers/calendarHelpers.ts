import {DateTime} from 'luxon';
import {range} from 'lodash';

/*
 * Constants.
 */

export enum CalendarWeekDaysEnum {
  SUNDAY = 'sunday',
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday'
};

export const calendarWeekdayToWeekdayNumber = {
  [CalendarWeekDaysEnum.MONDAY]: 1,
  [CalendarWeekDaysEnum.TUESDAY]: 2,
  [CalendarWeekDaysEnum.WEDNESDAY]: 3,
  [CalendarWeekDaysEnum.THURSDAY]: 4,
  [CalendarWeekDaysEnum.FRIDAY]: 5,
  [CalendarWeekDaysEnum.SATURDAY]: 6,
  [CalendarWeekDaysEnum.SUNDAY]: 7
};

/*
 * Helpers.
 */

/** Get the sorted weekdays number, starting with Sunday. */
export function getSortedWeekdays() {
  const sortedCalendarWeekdays = Object.values(CalendarWeekDaysEnum);
  return sortedCalendarWeekdays.map(weekdayName => calendarWeekdayToWeekdayNumber[weekdayName]);
}

/** Get the full list of days for the provided month, sorted by the provided week days. */
export function getCalendarDays(month: DateTime, weekdays: ReadonlyArray<number>) {
  // Find the first datetime of the months we're going to work with.
  const previousMonth = month.minus({months: 1});
  const nextMonth = month.plus({months: 1});

  // Figure out the size of the left & right padding.
  const startOfmonth = month.startOf('month');
  const previousPad = weekdays.indexOf(startOfmonth.weekday);
  const rows = Math.ceil((month.daysInMonth + previousPad) / 7);
  const totalBoxes = rows * 7;
  const nextPad = totalBoxes - (previousPad + month.daysInMonth);

  // Build the day numbers for each range.
  const previousMonthDayNumbers = range(
    previousMonth.daysInMonth - previousPad + 1,
    previousMonth.daysInMonth + 1
  );
  const currentMonthDayNumbers = range(1, month.daysInMonth + 1)
  const nextMonthDayNumbers = range(1, nextPad + 1)

  // Map the day numbers to datetimes.
  const previousMonthDays = previousMonthDayNumbers.map((day: any) => previousMonth.set({day}));
  const currentMonthDays = currentMonthDayNumbers.map((day: any) => month.set({day}));
  const nextMonthDays = nextMonthDayNumbers.map((day: any) => nextMonth.set({day}));

  // Combine everything and return.
  return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
}
