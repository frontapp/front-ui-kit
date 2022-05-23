import {DateTime} from 'luxon';
import React, {FC, MouseEventHandler, useState} from 'react';
import styled from 'styled-components';

import {DatepickerViewsEnum} from '../../helpers/calendarHelpers';
import {greys} from '../../helpers/colorHelpers';
import {Input} from '../input/input';

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
  width: 254px;

  background-color: ${greys.white};
`;

/*
 * Component.
 */

export const DatePickerFooter: FC<DatePickerFooterProps> = props => {
  const {selectedView, onViewChange} = props;
  const [selectedDate, _] = useState(props.selectedDate?.toString());
  const onDateFocus = () => {
    onViewChange(DatepickerViewsEnum.Date);
  };

  const onTimeFocus = () => {
    onViewChange(DatepickerViewsEnum.Time);
  };

  return <StyledWrapperDiv>
    <Input
      id="date"
      value={selectedDate?.toString()}
      shouldFocus={selectedView === DatepickerViewsEnum.Date}
      onFocus={onDateFocus} />
    <Input id="time" value={selectedDate?.toString()} shouldFocus={selectedView === DatepickerViewsEnum.Time} onFocus={onTimeFocus} />
  </StyledWrapperDiv>

};
