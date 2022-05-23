import {DateTime} from 'luxon';
import React, {FC, MouseEventHandler, useState} from 'react';
import styled from 'styled-components';

import {DatepickerViewsEnum} from '../../helpers/calendarHelpers';
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
  const {selectedDate, selectedView, onViewChange} = props;
  const [selectedDateTime, setSelectedDateTime] = useState(selectedDate);
  const [dateValue, setDateValue] = useState(selectedDateTime?.toString());
  const [timeValue, setTimeValue] = useState(selectedDateTime?.toLocaleString(DateTime.TIME_SIMPLE));

  // Focus handlers
  const onTimeFocus = () => {
    onViewChange(DatepickerViewsEnum.Time);
  };
  const onDateFocus = () => {
    onViewChange(DatepickerViewsEnum.Date);
  };

  // Change handlers
  const onTimeChange = (newTimeValue: string) => {
    setTimeValue(newTimeValue);
    const dateAndTime = parseTime(selectedDateTime || DateTime.now(), newTimeValue);
    setSelectedDateTime(dateAndTime);
  };
  const onDateChange = (newDateValue: string) => {
    setDateValue(newDateValue);
    const dateAndTime = parseDate(newDateValue, selectedDateTime || DateTime.fromISO("12:00 PM"));
    setSelectedDateTime(dateAndTime);0
  }

  return <StyledWrapperDiv>
    <Input
      id="date"
      value={dateValue}
      shouldFocus={selectedView === DatepickerViewsEnum.Date}
      onFocus={onDateFocus} 
      maxWidth={MAX_INPUT_WIDTH}
      onChange={onDateChange}/>
    <Input
      id="time"
      value={timeValue}
      shouldFocus={selectedView === DatepickerViewsEnum.Time}
      onFocus={onTimeFocus}
      maxWidth={MAX_INPUT_WIDTH}
      onChange={onTimeChange} />
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

/**
 * @param date Chosen date (time portion is not relevant)
 * @param time Chosen time (date portion is not relevant)
 */
 function mergeDateAndTime(date: DateTime, time: DateTime) {
  return date.startOf('minute').set({
    hour: time.hour,
    minute: time.minute
  });
}
