import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Textarea} from '../textarea';

export default {
  title: 'Front UI Kit/Textarea',
  component: Textarea
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = args => <Textarea {...args} />;

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
