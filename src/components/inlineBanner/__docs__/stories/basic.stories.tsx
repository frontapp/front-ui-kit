import {ComponentStory} from '@storybook/react';
import React from 'react';

import {VisualSizesEnum} from '../../../../helpers/fontHelpers';
import {InlineBanner} from '../../inlineBanner';

export const Basic: ComponentStory<typeof InlineBanner> = (args) => <InlineBanner {...args} />;

Basic.args = {
  size: VisualSizesEnum.SMALL,
  type: 'success',
  title: `I'm making a note here: huge success!`
};
