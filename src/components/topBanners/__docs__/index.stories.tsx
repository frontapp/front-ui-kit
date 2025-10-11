/* eslint-disable storybook/story-exports */
import {Meta} from '@storybook/react';

import {TopBanner} from '../topBanner';
/*
 * Storybook.
 */

export default {
  title: 'Components/Top Banner',
  component: TopBanner,
  parameters: {},
  id: 'Components/Top Banner'
} as Meta<typeof TopBanner>;

export {Basic} from './stories/basic.stories';
export {BannerTypes} from './stories/bannerTypes.stories';
export {CustomMessages} from './stories/customMessages.stories';
export {AutoDismiss} from './stories/autoDismiss.stories';
