import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Checkbox} from '../checkbox';

export default {
  title: 'Front UI Kit/Checkbox',
  component: Checkbox
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = args => <Checkbox {...args}>Example Checkbox</Checkbox>;

export const Basic = Template.bind({});
