import {isUndefined} from 'lodash';
import {DateTime} from 'luxon';
import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';

import {CalendarWeekDaysEnum} from '../../helpers/calendarHelpers';
import {DatePickerCalendar} from './datepickerCalendar';
import {DatePickerHeader} from './datepickerHeader';

/*
 * Props.
 */

interface DatePickerProps {
  /** The selected date */
  value?: Date;
  /** Controls allowing selecting a time. Default is date. */
  type?: 'date' | 'dateAndTime';
  /** The minimum date allowed to be selected. */
  minDate?: Date;
  /** The maximum date allowed to be selected. */
  maxDate?: Date;
  /** Called when a date is selected in date mode. */
  onChange: (value: Date) => void;
  /** The day of the the week the calendar should start on. The default is Sunday */
  calendarWeekStartDay?: CalendarWeekDaysEnum
  // TODO placeholder, timeFormat, onClear
}

/*
 * Style.
 */

const StyledPickerDiv = styled.div`
  display: grid;
  grid-auto-rows: auto;
  width: 254px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

/*
 * Component.
 */

export const DatePicker: FC<DatePickerProps> = props => {
  const {
    value = new Date(),
    calendarWeekStartDay = CalendarWeekDaysEnum.SUNDAY,
    minDate,
    maxDate,
    onChange
  } = props;
  const [selectedDate, setSelectedDate] = useState(DateTime.fromJSDate(value));
  const selectedDateMonth = selectedDate?.startOf('month');
  const [focusedMonth, setFocusedMonth] = useState(selectedDateMonth);

  // When the selected date changes, updated the focused month.
  const selectedDateMonthMillis = selectedDateMonth?.toMillis();
  useEffect(() => {
    if (isUndefined(selectedDateMonthMillis))
      return;
    setFocusedMonth(DateTime.fromMillis(selectedDateMonthMillis));
  }, [selectedDateMonthMillis]);

  const onFocusPreviousMonth = () => {
    setFocusedMonth(month => month.minus({months: 1}));
  };

  const onFocusNextMonth = () => {
    setFocusedMonth(month => month.plus({months: 1}));
  };

  const onDateSelect = (date: DateTime) => {
    setSelectedDate(date);
    if (onChange)
      onChange(date.toJSDate());
  };
  return (
    <StyledPickerDiv>
      <DatePickerHeader
        value={focusedMonth}
        onFocusPreviousMonth={onFocusPreviousMonth}
        onFocusNextMonth={onFocusNextMonth}
      />
      <DatePickerCalendar
        selectedDate={selectedDate}
        monthBeingViewed={focusedMonth}
        calendarWeekStartDay={calendarWeekStartDay}
        onDateSelect={onDateSelect}
        minDate={minDate && DateTime.fromJSDate(minDate)}
        maxDate={maxDate && DateTime.fromJSDate(maxDate)}
      />
    </StyledPickerDiv>
  );
};
