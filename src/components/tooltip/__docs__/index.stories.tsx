/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {TooltipCoordinator} from '../tooltipCoordinator';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Tooltip',
  component: TooltipCoordinator,
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
  id: 'Components/Tooltip'
} as ComponentMeta<typeof TooltipCoordinator>;

export {Basic} from './stories/basic.stories';
export {Explicit} from './stories/explicit.stories';
export {Overflow} from './stories/overflow.stories';
