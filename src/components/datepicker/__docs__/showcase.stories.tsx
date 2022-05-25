import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {CalendarWeekDaysEnum, formatDateTime} from '../../../helpers/calendarHelpers';
import {greys} from '../../../helpers/colorHelpers';
import {fontSizes} from '../../../helpers/fontHelpers';
import {DatePickerDropdown} from '../datepickerDropdown';

/*
 * Props.
 */

interface ShowcaseDatePickerProps {
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  type?: 'date' | 'dateAndTime';
  calendarWeekStartDay?: CalendarWeekDaysEnum;
  timeFormat?: '12h' | '24h';
}

/*
 * Style.
 */

const StyledShowcaseDiv = styled.div`
  background: ${greys.shade50};
  border-radius: 8px;
  width: 300px;
  height: 80px;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const StyledDescriptionDiv = styled.div`
  font-size: ${fontSizes.medium};
  color: ${greys.black};
  text-align: center;
  padding: 10px 0px
`;

/*
 * Component.
 */

const ShowcaseDatePickerComponent: FC<ShowcaseDatePickerProps> = props => {
  const onChange = (newDate: Date) => {
    setDescription(formatDateTime(newDate, type, timeFormat));
  };
  const {value, minDate, maxDate, type, calendarWeekStartDay, timeFormat} = props;
  const [description, setDescription] = useState(value && formatDateTime(value, type, timeFormat));

  return (
    <StyledShowcaseDiv>
      {description && <StyledDescriptionDiv>{description}</StyledDescriptionDiv>}
      <DatePickerDropdown
        value={value}
        calendarWeekStartDay={calendarWeekStartDay}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
        type={type}
        timeFormat={timeFormat}
      />
    </StyledShowcaseDiv>
  );
};

/*
 * Storybook.
 */

export default {
  title: 'Components/DatePicker',
  component: ShowcaseDatePickerComponent,
  argTypes: {
    minDate: {control: 'date'},
    maxDate: {control: 'date'},
    calendarWeekStartDay: {control: 'radio', options: CalendarWeekDaysEnum},
    type: {control: 'radio', options: ['date', 'dateAndTime']},
    timeFormat: {control: 'radio', options: ['12h', '24h']}
  }
} as ComponentMeta<typeof ShowcaseDatePickerComponent>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseDatePickerComponent> = (props: ShowcaseDatePickerProps) => <ShowcaseDatePickerComponent
  type={props.type}
  timeFormat={props.timeFormat}
  calendarWeekStartDay={props.calendarWeekStartDay}
  minDate={props.minDate && new Date(props.minDate)}
  maxDate={props.maxDate && new Date(props.maxDate)}
/>;
export const Showcase = ShowcaseTemplate.bind({});
