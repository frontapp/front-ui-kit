import React, {FC, useState} from 'react';

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
  /** Called either when a date (or date and time) is selected on hitting Done or when the date is cleared. */
  onChange: (value?: Date) => void;
  /** The day of the the week the calendar should start on. The default is Sunday */
  calendarWeekStartDay?: CalendarWeekDaysEnum;
}

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
  const onChangeDate = (date?: Date) => {
    setSelectedDate(date);
    onChange(date);
  };
  const onClearDate = selectedDate && (() => {
    onChangeDate(undefined);
  });

  return (
    <DropdownCoordinator
      placement="bottom-start"
      renderButton={isDropdownOpen => (
        <DropdownButton
          value={(selectedDate && formatDateTime(selectedDate, type, timeFormat)) || ""}
          placeholder={placeholder}
          iconName="Calendar"
          isActive={isDropdownOpen}
        />
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
    />
  );
};
