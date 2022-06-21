/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {ActionMenu} from '../actionMenu';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Action Menu',
  component: ActionMenu,
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
  id: "Components/Action Menu"
} as ComponentMeta<typeof ActionMenu>;

export {Basic} from './stories/basic.stories';
