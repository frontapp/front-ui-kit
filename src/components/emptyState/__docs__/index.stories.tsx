/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {EmptyState} from '../emptyState';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Elements/Empty State',
  component: EmptyState,
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
  id: 'Elements/Empty State'
} as ComponentMeta<typeof EmptyState>;

export {Basic} from './stories/basic.stories';
