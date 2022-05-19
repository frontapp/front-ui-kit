import {DateTime, Info} from 'luxon';
import React, {FC} from 'react';
import styled from 'styled-components';

import {CalendarWeekDaysEnum, getCalendarDays, getSortedWeekdays} from '../../helpers/calendarHelpers';
import {greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {DatePickerCalendarItem} from './datepickerCalendarItem';

/*
 * Props.
 */

interface DatePickerCalendarProps {
  /** The selected date */
  selectedDate?: DateTime;
  /** The selected month. This is different than the `selectedDate`. */
  monthBeingViewed?: DateTime;
  /** The day of the the week the calendar should start on. The default is Sunday */
  calendarWeekStartDay: CalendarWeekDaysEnum;
  /** The minimum date allowed to be selected. */
  minDate?: DateTime;
  /** The maximum date allowed to be selected. */
  maxDate?: DateTime;
  /** The handler for when a date is selected */
  onDateSelect?: (date: DateTime) => void;
}

/*
 * Style.
 */

const StyledGridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(7, min-content);
  grid-gap: 5px;
  justify-content: space-between;
  justify-items: center;
  background: ${greys.white};
  padding: 5px 8px;
`;

const StyledWeekdayDiv = styled.div`
  flex: 1;
  text-align: center;
  color: ${greys.shade70};
  line-height: 13px;
  font-family: ${fonts.system};
  font-size: ${fontSizes.tiny};
  font-weight: ${fontWeights.normal};
`;

/*
 * Component.
 */

export const DatePickerCalendar: FC<DatePickerCalendarProps> = props => {
  const {calendarWeekStartDay} = props;
  const weekdays = getSortedWeekdays(calendarWeekStartDay);
  return (
    <StyledGridDiv>
      {renderWeekdays(weekdays)}
      {renderDays(props, weekdays)}
    </StyledGridDiv>
  );
};

/*
 * Helpers
 */

/** Render the weekday headers. */
function renderWeekdays(weekdays: ReadonlyArray<number>) {
  return weekdays.map(weekDay => (
    <StyledWeekdayDiv key={`weekday-${weekDay}`}>
      {Info.weekdays('short')[weekDay - 1]}
    </StyledWeekdayDiv>
  ));
}

/** Render all the calendar days. */
function renderDays(
  props: DatePickerCalendarProps,
  weekdays: ReadonlyArray<number>
) {
  const {
    monthBeingViewed = DateTime.now().startOf('month'),
    selectedDate,
    minDate,
    maxDate,
    onDateSelect
  } = props;
  const days = getCalendarDays(monthBeingViewed, weekdays);
  return days.map(day => {
    // Check if this day is in range.
    const isAfterMinDate = !minDate || minDate < day.endOf('day');
    const isBeforeMaxDate = !maxDate || maxDate > day.startOf('day');
    return (
      <DatePickerCalendarItem
        key={day.valueOf()}
        day={day}
        isDifferentMonth={day.month !== monthBeingViewed.month}
        isSelectable={isAfterMinDate && isBeforeMaxDate}
        isSelected={areDatesEqual(day, selectedDate)}
        onSelect={() => onDateSelect && onDateSelect(day)}
      />
    );
  });
}

function areDatesEqual(date1: DateTime, date2?: DateTime) {
  return Boolean(date2 && date1.startOf('day').equals(date2.startOf('day')));
}
