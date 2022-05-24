import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

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
}

/*
 * Style.
 */

const StyledShowcaseDiv = styled.div`
  background: ${greys.shade50};
  border-radius: 8px;
  width: 300px;
  display: flex;
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
    setDescription(newDate.toDateString());
  };
  const {value, minDate, maxDate} = props;
  const [description, setDescription] = useState(value && value.toDateString());

  return (
    <StyledShowcaseDiv>
      {description && <StyledDescriptionDiv>{description}</StyledDescriptionDiv>}
      <DatePickerDropdown value={value} minDate={minDate} maxDate={maxDate} onChange={onChange} type="dateAndTime" />
    </StyledShowcaseDiv>
  );
};

/*
 * Storybook.
 */

export default {
  title: 'Development/DatePicker',
  component: ShowcaseDatePickerComponent,
  argTypes: {
    minDate: {control: 'date'},
    maxDate: {control: 'date'}
  }
} as ComponentMeta<typeof ShowcaseDatePickerComponent>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseDatePickerComponent> = (props: ShowcaseDatePickerProps) => <ShowcaseDatePickerComponent
  minDate={props.minDate && new Date(props.minDate)}
  maxDate={props.maxDate && new Date(props.maxDate)}
/>;
export const Showcase = ShowcaseTemplate.bind({});
