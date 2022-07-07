/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Checkbox} from '../checkbox';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
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
  id: 'Components/Checkbox'
} as ComponentMeta<typeof Checkbox>;

export {Basic} from './stories/basic.stories';
export {BasicReverse} from './stories/basic-reverse.stories';
export {Indeterminate} from './stories/indeterminate.stories';
