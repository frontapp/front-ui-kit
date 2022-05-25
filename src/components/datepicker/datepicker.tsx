import {isUndefined} from 'lodash';
import {DateTime} from 'luxon';
import React, {FC, MouseEventHandler, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';

import {CalendarWeekDaysEnum, DatepickerViewsEnum, mergeDateAndTime} from '../../helpers/calendarHelpers';
import {alphas, greys} from '../../helpers/colorHelpers';
import {DatePickerCalendar} from './datepickerCalendar';
import {DatePickerFooter} from './datepickerFooter';
import {DatePickerHeader} from './datepickerHeader';
import {TimePicker} from './timepicker';

/*
 * Props.
 */

interface DatePickerProps {
  /** The selected date */
  value?: Date;
  /** Controls allowing selecting a time. Default is date. */
  type?: 'date' | 'dateAndTime';
  /** The format to display time in. This is only used if dateAndTime type is selected. */
  timeFormat: '12h' | '24h';
  /** The minimum date allowed to be selected. */
  minDate?: Date;
  /** The maximum date allowed to be selected. */
  maxDate?: Date;
  /** Called when a date is selected in date mode or when 'Done' is clicked in the 'dateAndTime' mode. */
  onChange: (value: Date) => void;
  /** The day of the the week the calendar should start on. The default is Sunday */
  calendarWeekStartDay?: CalendarWeekDaysEnum
  /** The dropdown's close method which is called when Cancel is clicked. */
  onRequestClose: () => void;
}

/*
 * Style.
 */

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${greys.white};
  box-shadow: 0px 0px 1px ${alphas.black50}, 0px 3px 10px ${alphas.black30};
  width: 254px;
  overflow: auto;
  border-radius: 8px;
`;

const StyledDatePickerDiv = styled.div`
  position: relative;
  display: grid;
  grid-auto-rows: auto;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const StyledTimePickerDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const StyledInputsDiv = styled.div`
  padding: 12px 12px 0 12px;
  border-top: 1px solid ${greys.shade30};
`;

/*
 * Component.
 */

export const DatePicker: FC<DatePickerProps> = props => {
  const {
    value,
    calendarWeekStartDay = CalendarWeekDaysEnum.SUNDAY,
    timeFormat,
    minDate,
    maxDate,
    onChange,
    type,
    onRequestClose
  } = props;
  const [selectedDate, setSelectedDate] = useState(value && DateTime.fromJSDate(value));
  const selectedDateMonth = selectedDate?.startOf('month');
  const [focusedMonth, setFocusedMonth] = useState(selectedDateMonth);
  const [selectedView, setSelectedView] = useState(DatepickerViewsEnum.DATE);

  // When the selected date changes, updated the focused month.
  const selectedDateMonthMillis = selectedDateMonth?.toMillis();
  useEffect(() => {
    if (isUndefined(selectedDateMonthMillis))
      return;
    setFocusedMonth(DateTime.fromMillis(selectedDateMonthMillis));
  }, [selectedDateMonthMillis]);

  const minDateTime = useMemo(() => minDate && DateTime.fromJSDate(minDate), [minDate]);
  const maxDateTime = useMemo(() => maxDate && DateTime.fromJSDate(maxDate), [maxDate]);

  const onFocusPreviousMonth = () => {
    setFocusedMonth(month => month && month.minus({months: 1}));
  };
  const onFocusNextMonth = () => {
    setFocusedMonth(month => month && month.plus({months: 1}));
  };

  const onDateSelect = (date: DateTime) => {
    const mergedDate = mergeDateAndTime(date, selectedDate || DateTime.now().startOf("day"));
    if (!(isDateSelectable(mergedDate, minDateTime, maxDateTime)))
      return;
    setSelectedDate(mergedDate);
    if (type === 'date') {
      onChange(mergedDate.toJSDate());
      onRequestClose();
    }
  };

  const onTimeSelect = (date: DateTime) => {
    setSelectedDate(date);
  };

  const onViewChange = (changedView: DatepickerViewsEnum) => {
    setSelectedView(changedView);
  };
  const onDateChange = (date: DateTime) => {
    setSelectedDate(date);
  };

  const onDone: MouseEventHandler = () => {
    if (type === 'dateAndTime' && selectedDate)
      onChange(selectedDate?.toJSDate());
    onRequestClose();
  };

  return (
    <StyledWrapperDiv>
      <StyledDatePickerDiv>
        <DatePickerHeader
          value={focusedMonth}
          onFocusPreviousMonth={onFocusPreviousMonth}
          onFocusNextMonth={onFocusNextMonth}
        />
        <DatePickerCalendar
          selectedDate={selectedDate}
          monthBeingViewed={focusedMonth}
          calendarWeekStartDay={calendarWeekStartDay}
          onDateSelect={onDateSelect}
          minDate={minDateTime}
          maxDate={maxDateTime}
        />
        {maybeRenderTimePicker(selectedView, onTimeSelect, timeFormat, selectedDate)}
      </StyledDatePickerDiv>
      {type === 'dateAndTime' &&
        <StyledInputsDiv>
          <DatePickerFooter
            selectedDate={selectedDate}
            selectedView={selectedView}
            onDateChange={onDateChange}
            onViewChange={onViewChange}
            onDoneClick={onDone}
            timeFormat={timeFormat}
            onRequestClose={onRequestClose}
          />
        </StyledInputsDiv>
      }
    </StyledWrapperDiv>
  );
};

/*
 * Helpers
 */

function maybeRenderTimePicker(selectedView: DatepickerViewsEnum,
  onTimeSelect: (date: DateTime) => void, timeFormat: '12h' | '24h', selectedDate?: DateTime) {
  if (selectedView === DatepickerViewsEnum.DATE)
    return null;
  return (
    <StyledTimePickerDiv>
      <TimePicker
        timeFormat={timeFormat}
        value={selectedDate}
        onChange={onTimeSelect}
      />;
    </StyledTimePickerDiv>
  );
}

function isDateSelectable(date: DateTime, minDate?: DateTime, maxDate?: DateTime) {
  const startMillis = minDate && minDate.toMillis();
  const endMillis = maxDate && maxDate.toMillis();
  if (!startMillis && !endMillis)
    return true;

  const dateMillis = date.toMillis();
  if (startMillis && !endMillis)
    return dateMillis >= startMillis;
  if (!startMillis && endMillis)
    return dateMillis <= endMillis;
  if (startMillis && endMillis)
    return dateMillis >= startMillis && dateMillis <= endMillis;
  return false;
}