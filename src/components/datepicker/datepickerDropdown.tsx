import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {CalendarWeekDaysEnum} from '../../helpers/calendarHelpers';
import {greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {DropdownCoordinator} from '../dropdown/dropdownCoordinator';
import {Icon} from '../icon/icon';
import {DatePicker} from './datepicker';

/*
 * Props.
 */

interface DatePickerDropdownProps {
  /** The selected date */
  value?: Date;
  /** The placeholder value */
  placeholder?: string;
  /** Controls allowing selecting a time. Default is date. */
  type?: 'date' | 'dateAndTime';
  /** The minimum date allowed to be selected. */
  minDate?: Date;
  /** The maximum date allowed to be selected. */
  maxDate?: Date;
  /** Called when a date is selected in date mode or when 'Done' is clicked in the 'dateAndTime' mode. */
  onChange: (value: Date) => void;
  /** The day of the the week the calendar should start on. The default is Sunday */
  calendarWeekStartDay?: CalendarWeekDaysEnum
  /** Controls if the clear button is visible and is only supported when in dateAndTime mode.  */
  onClear?: () => void;
  onRequestClose: () => void;
  // TODO timeformat
}

/*
 * Style
 */

const StyledDatePickerButtonDiv = styled.div`
  width: 254px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${greys.white};
  border-radius: 4px;
  padding: 5px 8px;
  gap: 8px;
`;

const StyledDatePickerButtonContentDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.normal};
  line-height: 17px;
`;

const StyledDateTimeDiv = styled.div`
  color: ${greys.shade90};
  white-space: nowrap;
`;

const StyledPlaceholderDiv = styled.div`
  color: ${greys.shade60};
  white-space: nowrap;
`;

/*
 * Component.
 */

export const DatePickerDropdown: FC<DatePickerDropdownProps> = props => {
  const {
    value,
    placeholder,
    calendarWeekStartDay,
    minDate,
    maxDate,
    onChange,
    type,
    onClear,
    onRequestClose
  } = props;
  const [selectedDate, setSelectedDate] = useState(value);
  const onChangeDate = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return <DropdownCoordinator
    isOverlayCloseDisabled
    placement="bottom-start"
    renderButton={() => <StyledDatePickerButtonDiv>{renderDatePickerCalendarButton(selectedDate, placeholder)}</StyledDatePickerButtonDiv>}
    renderDropdown={onCloseDropdown => (
      <DatePicker
        value={selectedDate}
        calendarWeekStartDay={calendarWeekStartDay}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChangeDate}
        type={type}
        onClear={onClear}
        onRequestClose={onCloseDropdown}
      />
    )}
  />;
};

/*
 * Helpers
 */

function renderDatePickerCalendarButton(selectedDate?: Date, placeholder?: string) {
  if (selectedDate)
    return (
      <StyledDatePickerButtonContentDiv>
        <Icon name="Calendar" color={greys.shade70} />
        <StyledDateTimeDiv>
          {selectedDate?.toDateString()}
        </StyledDateTimeDiv>
        <Icon name="ChevronDown" color={greys.shade70} />
      </StyledDatePickerButtonContentDiv>
    );

  return (
    <StyledDatePickerButtonContentDiv>
      <Icon name="Calendar" color={greys.shade70} />
      <StyledPlaceholderDiv>
        {placeholder}
      </StyledPlaceholderDiv>
      <Icon name="ChevronDown" color={greys.shade70} />
    </StyledDatePickerButtonContentDiv>
  );
}
