import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Icon, icons} from '../icon';

export default {
  title: 'Front UI Kit/Icons',
  component: Icon
} as ComponentMeta<typeof Icon>;

const Template: ComponentStory<typeof Icon> = args => <Icon {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  name: 'CheckmarkCircle',
  size: 32
};
Basic.parameters = {
  name: {
    values: Object.keys(icons).map(iconName => ({name: iconName, value: iconName}))
  }
};
