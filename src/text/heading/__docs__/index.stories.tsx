/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Heading} from '../heading';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Text/Heading',
  component: Heading,
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
  id: 'Text/Heading'
} as ComponentMeta<typeof Heading>;

export {Basic} from './stories/basic.stories';
