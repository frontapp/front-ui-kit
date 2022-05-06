import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Pill} from '../pill';

export default {
  title: 'Front UI Kit/Pill',
  component: Pill,
  argTypes: {
    children: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof Pill>;

const Template: ComponentStory<typeof Pill> = args => <Pill {...args}>Example Pill</Pill>;

export const Basic = Template.bind({});
