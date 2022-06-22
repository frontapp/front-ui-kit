/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Avatar} from '../avatar';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Avatar',
  component: Avatar,
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
  id: "Components/Avatar"
} as ComponentMeta<typeof Avatar>;

export {Basic} from './stories/basic.stories';
export {Initials} from './stories/initials.stories';
export {Images} from './stories/images.stories';
export {Sizes} from './stories/sizes.stories';
