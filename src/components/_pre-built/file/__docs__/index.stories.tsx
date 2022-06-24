/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {File} from '../file';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/File',
  component: File,
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
  id: "Components/File"
} as ComponentMeta<typeof File>;

export {Basic} from './stories/basic.stories';
export {Erred} from './stories/erred.stories';
export {OnClear} from './stories/on-clear.stories';
