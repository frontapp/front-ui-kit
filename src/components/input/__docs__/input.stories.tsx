import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Input} from '../input';

export default {
  title: 'Front UI Kit/Input',
  component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const BasicInput = Template.bind({});
BasicInput.args = {
  value: "Hello"
};
