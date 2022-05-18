import {isUndefined, noop} from 'lodash';
import {DateTime} from 'luxon';
import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';
import {DatePickerHeader} from './datepickerHeader';
import {DatePickerCalendar} from './datepickerCalendar';


/*
 * Props.
 */

interface DatePickerProps {
  /** The selected date */
  value?: Date;
  /** Controls allowing selecting a time. Default is date. */
  type?: 'date' | 'dateAndTime';
  /**  */
  placeholder?: string;
  /** The minimum date allowed to be selected. */
  minDate?: Date;
  /** The maximum date allowed to be selected. */
  maxDate?: Date;
  /** - Called when a date is selected in date mode and called when Confirm is clicked when dateAndTime is selected. */
  onChange: (value: Date) => void;
  // TODO calendarWeekStartDay, timeFormat, onClear
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
    value = new Date()
  } = props;
  const selectedDate = DateTime.fromJSDate(value);
  console.log(selectedDate);
  const selectedDateMonth = selectedDate?.startOf('month');
  const [focusedMonth, setFocusedMonth] = useState(selectedDateMonth);
  console.log(focusedMonth);


  /*
   * When the selected date changes, updated the focused month.
   */
  const selectedDateMonthMillis = selectedDateMonth?.toMillis();
  useEffect(() => {
    if (isUndefined(selectedDateMonthMillis))
      return;

    setFocusedMonth(DateTime.fromMillis(selectedDateMonthMillis));
  }, [selectedDateMonthMillis]);

  /*
   * Event handlers.
   */

  const onFocusPreviousMonth = () => {
    setFocusedMonth(value => value.minus({months: 1}));
  };
  const onFocusNextMonth = () => {
    setFocusedMonth(value => value.plus({months: 1}));
  }

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
        onDateSelect={noop}
      />
    </StyledPickerDiv>
  );
};