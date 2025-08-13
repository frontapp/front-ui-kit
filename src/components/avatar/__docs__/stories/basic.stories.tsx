import {StoryObj} from '@storybook/react';

import {Avatar} from '../../avatar';

export const Basic: StoryObj<typeof Avatar> = {
  args: {
    name: 'John Doe'
  }
};
