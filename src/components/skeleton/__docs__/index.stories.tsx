/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Skeleton} from '../skeleton';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
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
  id: 'Components/Skeleton'
} as ComponentMeta<typeof Skeleton>;

export {Basic} from './stories/basic.stories';
