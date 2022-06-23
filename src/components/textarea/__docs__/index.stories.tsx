/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Textarea} from '../textarea';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Elements/Textarea',
  component: Textarea,
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
  id: 'Elements/Textarea'
} as ComponentMeta<typeof Textarea>;

export {Basic} from './stories/basic.stories';
export {Disabled} from './stories/disabled.stories';
export {Erred} from './stories/erred.stories';
