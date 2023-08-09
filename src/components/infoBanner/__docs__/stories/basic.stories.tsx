import {ComponentStory} from '@storybook/react';
import React from 'react';

import {InfoBanner} from '../../infoBanner';

export const Basic: ComponentStory<typeof InfoBanner> = (args) => <InfoBanner {...args} />;

Basic.args = {
  title: 'Hello World',
  type: 'info'
};
