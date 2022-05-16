import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Tab} from '../tab';

export default {
  title: 'Components/Tabs',
  component: Tab
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = args => <Tab {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  name: "Example Tab",
  isSelected: false
};
