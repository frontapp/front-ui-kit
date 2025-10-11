/* eslint-disable storybook/story-exports */
import {Meta} from '@storybook/react';

import {Accordion} from '../accordion';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Accordion',
  component: Accordion,
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
  id: 'Components/Accordion'
} as Meta<typeof Accordion>;

export {Basic} from './stories/basic.stories';
export {Multi} from './stories/multi.stories';
