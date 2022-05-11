import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Input} from '../input';

export default {
  title: 'Front UI Kit/Input',
  component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const BasicEmptyInput = Template.bind({});
BasicEmptyInput.args = {
  placeholder: "Placeholder"
};

export const BasicTextInput = Template.bind({});
BasicTextInput.args = {
  value: "Hello"
};

export const BasicNumberInput = Template.bind({});
BasicNumberInput.args = {
  value: 20,
  type: 'number'
};

export const BasicPasswordInput = Template.bind({});
BasicPasswordInput.args = {
  value: "password",
  type: 'password'
};

export const BasicEmailInput = Template.bind({});
BasicEmailInput.args = {
  value: "hello@world.com",
  type: 'email'
};

export const BasicUrlInput = Template.bind({});
BasicUrlInput.args = {
  value: "http://google.com",
  type: 'url'
};
