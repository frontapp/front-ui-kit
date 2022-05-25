import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {CalendarWeekDaysEnum, formatDate} from '../../../helpers/calendarHelpers';
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
    setDescription(formatDate(newDate, type));
  };
  const {value, minDate, maxDate, type, calendarWeekStartDay} = props;
  const [description, setDescription] = useState(formatDate(value, type));

  const onClear = () => {
    console.log("Clearing the datepicker");
  };

  return (
    <StyledShowcaseDiv>
      {<StyledDescriptionDiv>{description}</StyledDescriptionDiv>}
      <DatePickerDropdown
        value={value}
        calendarWeekStartDay={calendarWeekStartDay}
        minDate={minDate}
        maxDate={maxDate}
        onChange={onChange}
        onClear={onClear}
        type={type}
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
    type: {control: 'radio', options: ['date', 'dateAndTime']}
  }
} as ComponentMeta<typeof ShowcaseDatePickerComponent>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseDatePickerComponent> = (props: ShowcaseDatePickerProps) => <ShowcaseDatePickerComponent
  type={props.type}
  calendarWeekStartDay={props.calendarWeekStartDay}
  minDate={props.minDate && new Date(props.minDate)}
  maxDate={props.maxDate && new Date(props.maxDate)}
/>;
export const Showcase = ShowcaseTemplate.bind({});
