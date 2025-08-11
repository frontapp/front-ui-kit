/* eslint-disable storybook/story-exports */
import {Meta} from '@storybook/react';

import {Icon} from '../icon';

/*
 * Storybook.
 */

export default {
  title: 'Elements/Icon',
  component: Icon
} as Meta<typeof Icon>;

export {Basic} from './stories/basic.stories';
export {BasicIcons} from './stories/basic-icon-showcase.stories';
export {AttachmentIcons} from './stories/attachment-icon-showcase.stories';
