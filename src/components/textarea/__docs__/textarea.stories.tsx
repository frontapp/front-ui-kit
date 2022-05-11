import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {TextArea} from '../textarea';

export default {
  title: 'Front UI Kit/TextArea',
  component: TextArea
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = args => <TextArea {...args} />;

export const BasicEmptyTextArea = Template.bind({});
BasicEmptyTextArea.args = {
  placeholder: "Placeholder",
  rows: 5
};

export const BasicTextArea = Template.bind({});
BasicTextArea.args = {
  value: "Hello",
  rows: 3
};
