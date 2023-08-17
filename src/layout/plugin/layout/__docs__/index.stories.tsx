/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {PluginLayout} from '../pluginLayout';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Layout/Plugin Layout',
  component: PluginLayout,
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
  id: 'Layout/Plugin Layout'
} as ComponentMeta<typeof PluginLayout>;

export {Basic} from './stories/basic.stories';
export {Search} from './stories/search.stories';
export {SubLevel} from './stories/sub-level.stories';
