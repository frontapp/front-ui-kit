/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Dropdown} from '../dropdown';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Elements/Dropdown',
  component: Dropdown,
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
  id: 'Elements/Dropdown'
} as ComponentMeta<typeof Dropdown>;

export {Basic} from './stories/basic.stories';
export {Simple} from './stories/simple.stories';
export {MultiLine} from './stories/multi-line.stories';
export {Avatar} from './stories/avatar.stories';
export {Header} from './stories/header.stories';
export {Form} from './stories/form.stories';

// Nested Dropdown Examples
export {BasicNestedDropdown} from './stories/nestedDropdown.stories';
export {CustomConfigDropdown} from './stories/nestedDropdown.stories';
export {MultiSelectDropdown} from './stories/nestedDropdown.stories';
export {LeftAlignedSubmenus} from './stories/nestedDropdown.stories';
export {PerformanceTest} from './stories/nestedDropdown.stories';
