import React, {FC} from 'react';

import {DropdownButton} from '../../elements/dropdown/dropdownButton';
import {DropdownCoordinator} from '../../elements/dropdown/dropdownCoordinator';
import {CalendarWeekDaysEnum, formatDateTime} from '../../helpers/calendarHelpers';
import {DatePicker} from './datepicker';

/*
 * Props.
 */

export interface DatePickerDropdownProps {
  /** The selected date */
  value?: Date;
  /** The placeholder value */
  placeholder?: string;
  /** Controls allowing selecting a time. */
  type?: 'date' | 'dateAndTime';
  /** The format to display time in. This is only used if dateAndTime type is selected. */
  timeFormat?: '12h' | '24h';
  /** The minimum date allowed to be selected. */
  minDate?: Date;
  /** The maximum date allowed to be selected. */
  maxDate?: Date;
  /** Called either when a date (or date and time) is selected on hitting Done or when the date is cleared. */
  onChange?: (value?: Date) => void;
  /** The day of the the week the calendar should start on. */
  calendarWeekStartDay?: CalendarWeekDaysEnum;
  /** Specify a different layer id to tie the dropdown to. */
  layerRootId?: string;
}

/*
 * Component.
 */

export const DatePickerDropdown: FC<DatePickerDropdownProps> = ({
  value,
  placeholder,
  calendarWeekStartDay = CalendarWeekDaysEnum.SUNDAY,
  minDate,
  maxDate,
  onChange,
  type = 'date',
  timeFormat = '12h',
  layerRootId
}) => {
  const onChangeDate = (date?: Date) => {
    if (onChange) onChange(date);
  };

  return (
    <DropdownCoordinator
      layerRootId={layerRootId}
      placement="bottom-start"
      renderButton={(isDropdownOpen, isDisabled, buttonRef, onClick) => (
        <DropdownButton
          value={(value && formatDateTime(value, type, timeFormat)) || ''}
          placeholder={placeholder}
          iconName="Calendar"
          isActive={isDropdownOpen}
          isDisabled={isDisabled}
          buttonRef={buttonRef}
          onClick={onClick}
        />
      )}
      renderDropdown={(onCloseDropdown) => (
        <DatePicker
          value={value}
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
