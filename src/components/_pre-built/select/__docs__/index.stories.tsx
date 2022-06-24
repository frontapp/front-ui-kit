/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Select} from '../select';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Select',
  component: Select,
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
  id: "Components/Select"
} as ComponentMeta<typeof Select>;

export {Basic} from './stories/basic.stories';
export {SelectHeader} from './stories/select-header.stories';
export {Multi} from './stories/multiple.stories';
export {Async} from './stories/async.stories';
export {AsyncMulti} from './stories/async-multi.stories';
export {Search} from './stories/search.stories';
