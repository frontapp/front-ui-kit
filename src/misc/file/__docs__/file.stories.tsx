import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {File} from '../file';

export default {
  title: 'Misc/File',
  component: File
} as ComponentMeta<typeof File>;

const Template: ComponentStory<typeof File> = args => <File {...args}>Label</File>;

export const Basic = Template.bind({});
Basic.args = {
  fileName: 'filename.csv',
  fileSize: 30,
  onClear: () => console.log("Clicking the clear button.")
};
