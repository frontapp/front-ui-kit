import {isUndefined} from 'lodash';
import {DateTime} from 'luxon';
import React, {FC, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';

import {CalendarWeekDaysEnum} from '../../helpers/calendarHelpers';
import {alphas} from '../../helpers/colorHelpers';
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

const StyledDatePickerDiv = styled.div`
  display: grid;
  grid-auto-rows: auto;
  width: 254px;
  box-shadow: 0px 0px 1px ${alphas.black50}, 0px 3px 10px ${alphas.black30};
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
    value,
    calendarWeekStartDay = CalendarWeekDaysEnum.SUNDAY,
    minDate,
    maxDate,
    onChange
  } = props;
  const [selectedDate, setSelectedDate] = useState(value && DateTime.fromJSDate(value));
  const selectedDateMonth = selectedDate?.startOf('month');
  const [focusedMonth, setFocusedMonth] = useState(selectedDateMonth);

  // When the selected date changes, updated the focused month.
  const selectedDateMonthMillis = selectedDateMonth?.toMillis();
  useEffect(() => {
    if (isUndefined(selectedDateMonthMillis))
      return;
    setFocusedMonth(DateTime.fromMillis(selectedDateMonthMillis));
  }, [selectedDateMonthMillis]);

  const minDateTime = useMemo(() => minDate && DateTime.fromJSDate(minDate), [minDate]);
  const maxDateTime = useMemo(() => maxDate && DateTime.fromJSDate(maxDate), [maxDate]);

  const onFocusPreviousMonth = () => {
    setFocusedMonth(month => month && month.minus({months: 1}));
  };

  const onFocusNextMonth = () => {
    setFocusedMonth(month => month && month.plus({months: 1}));
  };

  const onDateSelect = (date: DateTime) => {
    if (!(isDateSelectable(date, minDateTime, maxDateTime)))
      return;
    setSelectedDate(date);
    if (onChange)
      onChange(date.toJSDate());
  };

  return (
    <StyledDatePickerDiv>
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
        minDate={minDateTime}
        maxDate={maxDateTime}
      />
    </StyledDatePickerDiv>
  );
};

/*
 * Helpers
 */

function isDateSelectable(date: DateTime, minDate?: DateTime, maxDate?: DateTime) {
  const startMillis = minDate && minDate.toMillis();
  const endMillis = maxDate && maxDate.toMillis();
  if (!startMillis && !endMillis)
    return true;

  const dateMillis = date.toMillis();
  if (startMillis && !endMillis)
    return dateMillis >= startMillis;
  if (!startMillis && endMillis)
    return dateMillis <= endMillis;
  if (startMillis && endMillis)
    return dateMillis >= startMillis && dateMillis <= endMillis;
  return false;
}
