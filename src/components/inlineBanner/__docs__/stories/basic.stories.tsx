import {StoryObj} from '@storybook/react';
import React from 'react';

import {VisualSizesEnum} from '../../../../helpers/fontHelpers';
import {InlineBanner} from '../../inlineBanner';

export const Basic: StoryObj<typeof InlineBanner> = {
  render: (args) => <InlineBanner {...args} />,
  args: {
    size: VisualSizesEnum.SMALL,
    type: 'success',
    title: `I'm making a note here: huge success!`
  }
};
