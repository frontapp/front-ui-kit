import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {CalendarWeekDaysEnum, formatDateTime} from '../../helpers/calendarHelpers';
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
  width: 234px;
  height: 16px;
  background: ${greys.shade20};
  border: 2px solid ${greys.shade30};
  border-radius: 6px;
  padding: 5px 8px;
  gap: 8px;
  cursor: default;

  &:hover {
    background: ${greys.shade30};
  }
`;

const StyledDatePickerButtonContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.normal};
  line-height: 17px;
`;

const StyledDateTimeDiv = styled.div`
  color: ${greys.shade80};
  white-space: nowrap;
`;

const StyledPlaceholderDiv = styled.div`
  color: ${greys.shade60};
  white-space: nowrap;
`;

const StyledIconDiv = styled.div`
  margin-left: auto
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
    renderButton={() => (
      <StyledDatePickerButtonDiv>
        {renderDatePickerCalendarButton(type, selectedDate, placeholder, timeFormat)}
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

/*
 * Helpers
 */

function renderDatePickerCalendarButton(type: 'date' | 'dateAndTime', selectedDate?: Date, placeholder?: string, timeFormat?: '12h' | '24h') {
  if (selectedDate)
    return (
      <StyledDatePickerButtonContentDiv>
        <Icon name="Calendar" color={greys.shade70} />
        <StyledDateTimeDiv>
          {formatDateTime(selectedDate, type, timeFormat)}
        </StyledDateTimeDiv>
        <StyledIconDiv>
          <Icon name="ChevronDown" color={greys.shade70} />
        </StyledIconDiv>
      </StyledDatePickerButtonContentDiv>
    );

  return (
    <StyledDatePickerButtonContentDiv>
      <Icon name="Calendar" color={greys.shade70} />
      <StyledPlaceholderDiv>
        {placeholder}
      </StyledPlaceholderDiv>
      <StyledIconDiv>
        <Icon name="ChevronDown" color={greys.shade70} />
      </StyledIconDiv>
    </StyledDatePickerButtonContentDiv>
  );
}
