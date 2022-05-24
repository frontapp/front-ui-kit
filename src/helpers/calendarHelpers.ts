import {range} from 'lodash';
import {DateTime} from 'luxon';

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
}

export enum DatepickerViewsEnum {
  DATE = 'Date',
  TIME = 'Time'
}

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
export function getSortedWeekdays(calendarWeekStartDay: CalendarWeekDaysEnum) {
  const sortedCalendarWeekdays = getSortedWeekdayNames(calendarWeekStartDay);
  return sortedCalendarWeekdays.map(weekdayName => calendarWeekdayToWeekdayNumber[weekdayName]);
}

export function getSortedWeekdayNames(calendarWeekStartDay: CalendarWeekDaysEnum) {
  const unorderedWeekdays = Object.values(CalendarWeekDaysEnum);
  const splitIndex = unorderedWeekdays.indexOf(calendarWeekStartDay);
  const left = unorderedWeekdays.slice(0, splitIndex);
  const right = unorderedWeekdays.slice(splitIndex);
  return [...right, ...left];
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
  const currentMonthDayNumbers = range(1, month.daysInMonth + 1);
  const nextMonthDayNumbers = range(1, nextPad + 1);

  // Map the day numbers to datetimes.
  const previousMonthDays = previousMonthDayNumbers.map((day: number) => previousMonth.set({day}));
  const currentMonthDays = currentMonthDayNumbers.map((day: number) => month.set({day}));
  const nextMonthDays = nextMonthDayNumbers.map((day: number) => nextMonth.set({day}));

  // Combine everything and return.
  return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
}

/**
 * @param date Chosen date (time portion is not relevant)
 * @param time Chosen time (date portion is not relevant)
 */
export function mergeDateAndTime(date: DateTime, time: DateTime) {
  return date.startOf('minute').set({
    hour: time.hour,
    minute: time.minute
  });
}

export function formatDate(date?: Date) {
  if (date) {
    const dateTime = DateTime.fromJSDate(date);
    return `${dateTime.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)} ${dateTime.toLocaleString(DateTime.TIME_SIMPLE)}`;
  }
  return "";
}
