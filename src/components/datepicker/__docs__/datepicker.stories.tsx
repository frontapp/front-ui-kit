import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';
import {DatePickerDropdown} from '../datepickerDropdown';

/*
 * Style.
 */

const StyledDatePickerDiv = styled.div`
  background: ${greys.white};
  border-radius: 8px;
  padding: 10px;
  display: grid;
  align-items: center;
  justify-content: center;
`;

export default {
  title: 'Components/DatePicker',
  component: DatePickerDropdown
} as ComponentMeta<typeof DatePickerDropdown>;

const Template: ComponentStory<typeof DatePickerDropdown> = args => (
  <StyledDatePickerDiv>
    <DatePickerDropdown
      {...args}
      minDate={args.minDate && new Date(args.minDate)}
      maxDate={args.maxDate && new Date(args.maxDate)}
    />
  </StyledDatePickerDiv>
);
export const Basic = Template.bind({});
