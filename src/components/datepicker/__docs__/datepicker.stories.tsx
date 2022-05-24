import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {DatePickerDropdown} from '../datepickerDropdown';

export default {
  title: 'Components/DatePicker',
  component: DatePickerDropdown
} as ComponentMeta<typeof DatePickerDropdown>;

const Template: ComponentStory<typeof DatePickerDropdown> = args => <DatePickerDropdown
  {...args}
  minDate={args.minDate && new Date(args.minDate)}
  maxDate={args.maxDate && new Date(args.maxDate)}
/>;
export const Basic = Template.bind({});
