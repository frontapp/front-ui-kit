/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Loader} from '../loader';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Loader',
  component: Loader,
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
  id: 'Components/Loader'
} as ComponentMeta<typeof Loader>;

export {Basic, Big} from './stories/basic.stories';
