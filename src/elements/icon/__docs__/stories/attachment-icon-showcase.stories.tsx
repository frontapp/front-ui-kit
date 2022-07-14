import {ComponentStory} from '@storybook/react';
import React from 'react';

import {Icon, icons} from '../../icon';
import {IconShowcase} from './showcase.stories';

const Template: ComponentStory<typeof Icon> = () => (
  <IconShowcase iconNames={Object.keys(icons).filter(iconName => iconName.includes('Attachment'))} />
);

export const AttachmentIcons = Template.bind({});
