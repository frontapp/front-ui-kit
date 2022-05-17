import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {DateTime} from 'luxon';

import {DatePickerHeader} from '../datepickerHeader';

export default {
  title: 'Components/DatePicker',
  component: DatePickerHeader
} as ComponentMeta<typeof DatePickerHeader>;

const Template: ComponentStory<typeof DatePickerHeader> = args => <DatePickerHeader {...args} />;

export const DatePickerHeaderBasic = Template.bind({});
DatePickerHeaderBasic.args = {
  focusedMonth: DateTime.now(),
};
