/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {TopBanner} from '../topBanner';
/*
 * Storybook.
 */

export default {
  title: 'Components/Top Banner',
  component: TopBanner,
  parameters: {},
  id: 'Components/Top Banner'
} as ComponentMeta<typeof TopBanner>;

export {Basic} from './stories/basic.stories';
