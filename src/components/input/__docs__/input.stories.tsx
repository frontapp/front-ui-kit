import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';
import {Input} from '../input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    maxWidth: {
      defaultValue: 250
    }
  }
} as ComponentMeta<typeof Input>;

const StyledInputWrapperDiv = styled.div`
  background: ${greys.white};
  padding: 32px;
  border-radius: 8px;
`;

const Template: ComponentStory<typeof Input> = args => <StyledInputWrapperDiv><Input {...args} /></StyledInputWrapperDiv>;

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

export const BasicInputWithIcon = Template.bind({});
BasicInputWithIcon.args = {
  value: "Hello",
  type: 'text',
  iconName: "Checkmark"
};
