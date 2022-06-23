/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Pill} from '../pill';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Pill',
  component: Pill,
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
  id: "Components/Pill"
} as ComponentMeta<typeof Pill>;

export {Basic} from './stories/basic.stories';
export {IconPill} from './stories/icon.stories';
