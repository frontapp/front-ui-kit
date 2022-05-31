import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Heading} from '../heading';

export default {
  title: 'Components/Heading',
  component: Heading
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = args => <Heading {...args}>Heading</Heading>;

export const Basic = Template.bind({});
