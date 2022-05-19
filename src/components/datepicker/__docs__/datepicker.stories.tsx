import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {DatePicker} from '../datepicker';

export default {
  title: 'Components/DatePicker',
  component: DatePicker
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = args => <DatePicker {...args} />;
export const Basic = Template.bind({});
