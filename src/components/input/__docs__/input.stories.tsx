import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Input, InputTypesEnum} from '../input';

export default {
  title: 'Front UI Kit/Input',
  component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const BasicEmptyInput = Template.bind({});
BasicEmptyInput.args = {
  placeholder: "Placeholder",
  type: InputTypesEnum.TEXT
};

export const BasicTextInput = Template.bind({});
BasicTextInput.args = {
  value: "Hello",
  placeholder: "Placeholder",
  type: InputTypesEnum.TEXT
};

export const BasicNumberInput = Template.bind({});
BasicNumberInput.args = {
  value: 20,
  placeholder: "Placeholder",
  type: InputTypesEnum.NUMBER
};

export const BasicPasswordInput = Template.bind({});
BasicPasswordInput.args = {
  value: "password",
  placeholder: "Placeholder",
  type: InputTypesEnum.PASSWORD
};

export const BasicEmailInput = Template.bind({});
BasicEmailInput.args = {
  value: "hello@world.com",
  placeholder: "Placeholder",
  type: InputTypesEnum.EMAIL
};
