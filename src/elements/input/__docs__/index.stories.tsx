/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Input} from '../input';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Elements/Input',
  component: Input,
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
  id: 'Elements/Input'
} as ComponentMeta<typeof Input>;

export {Basic} from './stories/basic.stories';
export {Disabled} from './stories/disabled.stories';
export {Erred} from './stories/erred.stories';
