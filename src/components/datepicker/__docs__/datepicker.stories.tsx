import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {DateTime} from 'luxon';

import {DatePickerHeader} from '../datepickerHeader';
import {DatePickerCalendar} from '../datepickerCalendar';
import {DatePicker} from '../datepicker';

export default {
  title: 'Components/DatePicker',
  component: DatePickerHeader
} as ComponentMeta<typeof DatePickerHeader>;

const Template: ComponentStory<typeof DatePicker> = args => <DatePicker {...args} />;
export const DatePickerBasic = Template.bind({});
