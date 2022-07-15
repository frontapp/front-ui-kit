/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Icon} from '../icon';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Elements/Icon',
  component: Icon,
  parameters: {
    docs: {
      page: DocumentationMDX
    },
    previewTabs: {
      canvas: {
        hidden: true
      }
    },
    viewMode: 'docs'
  },
  id: 'Elements/Icon'
} as ComponentMeta<typeof Icon>;

export {Basic} from './stories/basic.stories';
export {BasicIcons} from './stories/basic-icon-showcase.stories';
export {AttachmentIcons} from './stories/attachment-icon-showcase.stories';
