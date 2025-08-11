import {StoryObj} from '@storybook/react';
import React from 'react';

import {Icon, icons} from '../../icon';
import {IconShowcase} from './showcase.stories';

export const BasicIcons: StoryObj<typeof Icon> = {
  render: () => (
    <IconShowcase iconNames={Object.keys(icons).filter((iconName) => !iconName.includes('Attachment'))} />
  )
};
