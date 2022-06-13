import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {CalendarWeekDaysEnum, formatDateTime} from '../../../helpers/calendarHelpers';
import {greys} from '../../../helpers/colorHelpers';
import {fontSizes} from '../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
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
  background: ${greys.white};
  border-radius: 8px;
  padding: 16px;
  width: 254px;
`;

const StyledDescriptionDiv = styled.div`
  font-size: ${fontSizes.medium};
  color: ${greys.black};
  text-align: center;
  padding: 10px 10px
`;

/*
 * Component.
 */

const ShowcaseDatePickerComponent: FC<ShowcaseDatePickerProps> = props => {
  const onChange = (newDate?: Date) => {
    if (newDate)
      setDescription(formatDateTime(newDate, type, timeFormat));
    else
      setDescription("No date selected.");
  };
  const {value, minDate, maxDate, type, calendarWeekStartDay, timeFormat} = props;
  const [description, setDescription] = useState(value && formatDateTime(value, type, timeFormat));

  return (
    <DefaultStyleProvider>
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
    </DefaultStyleProvider>
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
