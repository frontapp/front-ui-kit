import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {CalendarWeekDaysEnum, formatDateTime} from '../../helpers/calendarHelpers';
import {DropdownButton} from '../dropdown/dropdownButton';
import {DropdownCoordinator} from '../dropdown/dropdownCoordinator';
import {DatePicker} from './datepicker';

/*
 * Props.
 */

export interface DatePickerDropdownProps {
  /** The selected date */
  value?: Date;
  /** The placeholder value */
  placeholder?: string;
  /** Controls allowing selecting a time. Default is date. */
  type?: 'date' | 'dateAndTime';
  /** The format to display time in. This is only used if dateAndTime type is selected. Default is 12h. */
  timeFormat?: '12h' | '24h';
  /** The minimum date allowed to be selected. */
  minDate?: Date;
  /** The maximum date allowed to be selected. */
  maxDate?: Date;
  /** Called when a date is selected in date mode or when 'Done' is clicked in the 'dateAndTime' mode. */
  onChange: (value: Date) => void;
  /** The day of the the week the calendar should start on. The default is Sunday */
  calendarWeekStartDay?: CalendarWeekDaysEnum
}

/*
 * Style
 */

const StyledDatePickerButtonDiv = styled.div`
  width: 270px;
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
    type = 'date',
    timeFormat = '12h'
  } = props;
  const [selectedDate, setSelectedDate] = useState(value);
  const onChangeDate = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return <DropdownCoordinator
    placement="bottom-start"
    isInline
    renderButton={isDropdownOpen => (
      <StyledDatePickerButtonDiv>
        <DropdownButton
          value={(selectedDate && formatDateTime(selectedDate, type, timeFormat)) || ""}
          placeholder={placeholder}
          iconName="Calendar"
          maxWidth={254}
          isActive={isDropdownOpen}
        />
      </StyledDatePickerButtonDiv>
    )}
    renderDropdown={onCloseDropdown => (
      <DatePicker
        value={selectedDate}
        timeFormat={timeFormat}
        calendarWeekStartDay={calendarWeekStartDay}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChangeDate}
        type={type}
        onRequestClose={onCloseDropdown}
      />
    )}
  />;
};
