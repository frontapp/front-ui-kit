/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Task} from '../task';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Task',
  component: Task,
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
  id: 'Components/Task'
} as ComponentMeta<typeof Task>;

export {Basic} from './stories/basic.stories';
export {Checkbox} from './stories/checkbox.stories';
export {Icon} from './stories/icon.stories';
export {Dropdown} from './stories/dropdown.stories';
