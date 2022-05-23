import { isUndefined } from 'lodash';
import {DateTime} from 'luxon';
import React, {FC, MouseEventHandler, useEffect, useState} from 'react';
import styled from 'styled-components';

import {DatepickerViewsEnum, mergeDateAndTime} from '../../helpers/calendarHelpers';
import {greys} from '../../helpers/colorHelpers';
import {Input} from '../input/input';

/*
 * Constant
 */
const MAX_INPUT_WIDTH = 107;

/*
 * Props.
 */

interface DatePickerFooterProps {
  /** The selected date */
  selectedDate?: DateTime;
  /** Controls which input is focused */
  selectedView: DatepickerViewsEnum;
  /** Called when the user updates the date via the input */
  onDateChange: (date: DateTime) => void;
  /** Called when the user selects an input */
  onViewChange: (view: DatepickerViewsEnum) => void;
  /** The Dropdowns `onRequestClose` function which is called when `cancel` is clicked */
  onRequestClose: () => void;
  /** Called when the user clicks "Done" */
  onDoneClick: MouseEventHandler;
  /** Controls if the `clear` button is visible and called when clear is clicked */
  onClear?: () => void;
}

/*
 * Style.
 */

const StyledWrapperDiv = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  width: inherit;

  background-color: ${greys.white};
`;

/*
 * Component.
 */

export const DatePickerFooter: FC<DatePickerFooterProps> = props => {
  const {selectedDate, selectedView, onViewChange, onDateChange} = props;
  const [dateValue, setDateValue] = useState(selectedDate?.toString());
  const [timeValue, setTimeValue] = useState(selectedDate?.toLocaleString(DateTime.TIME_SIMPLE));

  const selectedDateMillis = selectedDate?.toMillis();
  useEffect(() => {
    if (isUndefined(selectedDateMillis))
      return;
    const date = DateTime.fromMillis(selectedDateMillis)
    setTimeValue(date.toLocaleString(DateTime.TIME_SIMPLE));
    setDateValue(date.toFormat("MM/dd/yyyy"));
  }, [selectedDateMillis]);

  // Focus handlers
  const onTimeFocus = () => {
    onViewChange(DatepickerViewsEnum.Time);
  };
  const onDateFocus = () => {
    onViewChange(DatepickerViewsEnum.Date);
  };

  // Change handlers
  const onTimeValueChange = (newTimeValue: string) => {
    setTimeValue(newTimeValue);
    const dateAndTime = parseTime(selectedDate || DateTime.now(), newTimeValue);
    if (dateAndTime)
     onDateChange(dateAndTime);

  };
  const onDateValueChange = (newDateValue: string) => {
    setDateValue(newDateValue);
    const dateAndTime = parseDate(newDateValue, selectedDate || DateTime.now().startOf("day"));
    if (dateAndTime)
      onDateChange(dateAndTime);
  }

  return <StyledWrapperDiv>
    <Input
      id="date"
      value={dateValue}
      shouldFocus={selectedView === DatepickerViewsEnum.Date}
      onFocus={onDateFocus} 
      maxWidth={MAX_INPUT_WIDTH}
      onChange={onDateValueChange}/>
    <Input
      id="time"
      value={timeValue}
      shouldFocus={selectedView === DatepickerViewsEnum.Time}
      onFocus={onTimeFocus}
      maxWidth={MAX_INPUT_WIDTH}
      onChange={onTimeValueChange} />
  </StyledWrapperDiv>

};

/*
 * Helpers
 */

function parseTime(date: DateTime, timeValue: string) {
  const parsedTime = DateTime.fromISO(timeValue);
  if (!parsedTime.isValid)
    return undefined;

  return mergeDateAndTime(date, parsedTime);
}

function parseDate(dateValue: string, time: DateTime) {
  const parsedDate = DateTime.fromFormat(dateValue, "MM/dd/yyyy");
  if (!parsedDate.isValid)
    return undefined;
  return mergeDateAndTime(parsedDate, time);
}
