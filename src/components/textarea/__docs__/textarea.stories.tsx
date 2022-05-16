import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';
import {Textarea} from '../textarea';

export default {
  title: 'Components/Textarea',
  component: Textarea
} as ComponentMeta<typeof Textarea>;

const StyledTextareaWrapperDiv = styled.div`
  background: ${greys.white};
  padding: 32px;
  border-radius: 8px;
`;

const Template: ComponentStory<typeof Textarea> = args => <StyledTextareaWrapperDiv><Textarea {...args} /></StyledTextareaWrapperDiv>;

export const BasicEmptyTextarea = Template.bind({});
BasicEmptyTextarea.args = {
  placeholder: "Placeholder",
  rows: 5
};

export const BasicTextarea = Template.bind({});
BasicTextarea.args = {
  value: "Hello",
  rows: 3
};
