import _, {isUndefined} from 'lodash';
import {DateTime} from 'luxon';
import React, {FC, FocusEventHandler, MouseEventHandler, useEffect, useState} from 'react';
import styled from 'styled-components';

import {DatepickerViewsEnum, formatTime, mergeDateAndTime} from '../../helpers/calendarHelpers';
import {greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights, VisualSizesEnum} from '../../helpers/fontHelpers';
import {Button} from '../button/button';
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
  /** The format to display time in. */
  timeFormat: '12h' | '24h';
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
}

/*
 * Style.
 */

const StyledWrapperDiv = styled.div`
  width: inherit;
  background-color: ${greys.white};
`;

const StyledLabelsDiv = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  width: inherit;
  margin-bottom: 8px;
`;

const StyledLabelDiv = styled.div`
  font-family: ${fonts.system};
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.semibold};
  line-height: 15px;
  color: ${greys.shade70}
`;

const StyledInputsDiv = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  width: inherit;
`;

const StyledCancelDoneDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 6px;
`;

const StyledFooterDiv = styled.div`
  position: sticky;
  bottom: 0px;

  display: grid;
  grid-template-columns: auto auto;
  justify-content: end;

  padding: 12px 0px;
`;

/*
 * Component.
 */

export const DatePickerFooter: FC<DatePickerFooterProps> = props => {
  const {selectedDate, timeFormat, selectedView, onViewChange, onDateChange, onDoneClick, onRequestClose} = props;
  const [dateValue, setDateValue] = useState(selectedDate?.toFormat("MM/dd/yyyy"));
  const [timeValue, setTimeValue] = useState(selectedDate && formatTime(selectedDate, timeFormat));

  const selectedDateMillis = selectedDate?.toMillis();
  useEffect(() => {
    if (isUndefined(selectedDateMillis))
      return;
    const date = DateTime.fromMillis(selectedDateMillis);
    setTimeValue(formatTime(date, timeFormat));
    setDateValue(date.toFormat("MM/dd/yyyy"));
  }, [selectedDateMillis, timeFormat]);

  // Focus handlers
  const onTimeFocus: FocusEventHandler = () => {
    onViewChange(DatepickerViewsEnum.TIME);
  };
  const onDateFocus: FocusEventHandler = () => {
    onViewChange(DatepickerViewsEnum.DATE);
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
  };

  return (
    <StyledWrapperDiv>
      <StyledLabelsDiv>
        <StyledLabelDiv>Date</StyledLabelDiv>
        <StyledLabelDiv>Time</StyledLabelDiv>
      </StyledLabelsDiv>
      <StyledInputsDiv>
        <Input
          value={dateValue}
          onFocus={onDateFocus}
          shouldFocus={selectedView === DatepickerViewsEnum.DATE}
          maxWidth={MAX_INPUT_WIDTH}
          onChange={onDateValueChange}
        />
        <Input
          value={timeValue}
          shouldFocus={selectedView === DatepickerViewsEnum.TIME}
          onFocus={onTimeFocus}
          maxWidth={MAX_INPUT_WIDTH}
          onChange={onTimeValueChange}
        />
      </StyledInputsDiv>
      <StyledFooterDiv>
        <StyledCancelDoneDiv>
          <Button size={VisualSizesEnum.SMALL} type="secondary" onClick={onRequestClose}>
            Cancel
          </Button>
          <Button size={VisualSizesEnum.SMALL} type="primary" onClick={onDoneClick}>
            Done
          </Button>
        </StyledCancelDoneDiv>
      </StyledFooterDiv>
    </StyledWrapperDiv>
  );
};

/*
 * Helpers
 */

/** Given a date and a time string, merge them together to give a DateTime object */
function parseTime(date: DateTime, timeValue: string) {
  const formattedTime = DateTime.fromFormatExplain(
    `${date.toLocaleString(DateTime.DATE_SHORT)} ${timeValue}`, "M/d/yyyy h:mm a");
  if (!formattedTime.matches || _.isEmpty(formattedTime.matches))
    return undefined;

  const parsedTime = DateTime.now().startOf('minute').set({
    hour: formattedTime?.matches.h,
    minute: formattedTime?.matches.m
  });
  return mergeDateAndTime(date, parsedTime);
}

/** Given a date string and a time, merge them together to give a DateTime object */
function parseDate(dateValue: string, time: DateTime) {
  const parsedDate = DateTime.fromFormat(dateValue, "MM/dd/yyyy");
  if (!parsedDate.isValid)
    return undefined;
  return mergeDateAndTime(parsedDate, time);
}
