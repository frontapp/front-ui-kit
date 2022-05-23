import {ComponentMeta, ComponentStory} from '@storybook/react';
import {DateTime} from 'luxon';
import React from 'react';

import {TimePicker} from '../timepicker';

export default {
  title: 'Development/TimePicker',
  component: TimePicker
} as ComponentMeta<typeof TimePicker>;

const Template: ComponentStory<typeof TimePicker> = args => <TimePicker {...args} />;

export const BasicTimePicker = Template.bind({});
BasicTimePicker.args = {
  value: DateTime.now()
};
