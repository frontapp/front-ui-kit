/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Paragraph} from '../paragraph';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Text/Paragraph',
  component: Paragraph,
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
  id: 'Text/Paragraph'
} as ComponentMeta<typeof Paragraph>;

export {Basic} from './stories/basic.stories';
