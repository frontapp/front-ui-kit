/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Tab} from '../tab';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Tab',
  component: Tab,
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
  id: 'Components/Tab'
} as ComponentMeta<typeof Tab>;

export {Basic} from './stories/basic.stories';
export {BasicGroup} from './stories/basic-group.stories';
