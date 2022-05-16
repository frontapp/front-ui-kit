import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Skeleton} from '../skeleton';

export default {
  title: 'Components/Skeleton',
  component: Skeleton
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = args => <Skeleton {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  variant: 'dark',
  width: 400,
  height: 40
};
