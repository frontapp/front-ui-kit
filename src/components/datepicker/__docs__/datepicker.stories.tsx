import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {DateTime} from 'luxon';

import {DatePickerHeader} from '../datepickerHeader';
import {DatePickerCalendar} from '../datepickerCalendar';
import { DatePickerCalendarItem } from '../datepickerCalendarItem';

export default {
  title: 'Components/DatePicker',
  component: DatePickerHeader
} as ComponentMeta<typeof DatePickerHeader>;

const Template: ComponentStory<typeof DatePickerHeader> = args => <DatePickerHeader {...args} />;

export const DatePickerHeaderBasic = Template.bind({});
DatePickerHeaderBasic.args = {
  value: DateTime.now(),
};


const OtherTemplate: ComponentStory<typeof DatePickerCalendar> = args => <DatePickerCalendar {...args} />;

export const DDatePickerCalendarasic = OtherTemplate.bind({});
DDatePickerCalendarasic.args = {
  monthBeingViewed: DateTime.now(),
  selectedData: DateTime.now(),
};
