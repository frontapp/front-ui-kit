import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as Meta<typeof Checkbox>;

export const Basic: StoryObj<typeof Checkbox> = {
  args: {
    children: 'Label',
  },
};
