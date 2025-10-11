/* eslint-disable storybook/story-exports */
import {Meta} from '@storybook/react';

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
} as Meta<typeof Checkbox>;

export {Basic} from './stories/basic.stories';
export {BasicReverse} from './stories/basic-reverse.stories';
export {Indeterminate} from './stories/indeterminate.stories';
export {Colored} from './stories/colored.stories';
