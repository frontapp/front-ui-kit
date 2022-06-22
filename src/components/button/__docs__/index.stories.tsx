/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {Button} from '../button';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Button',
  component: Button,
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
  id: "Components/Button"
} as ComponentMeta<typeof Button>;

export {Basic} from './stories/basic.stories';
export {IconBasic} from './stories/icon-basic.stories';
export {IconContentBasic} from './stories/icon-content-basic.stories';
export {GroupBasic} from './stories/group-basic.stories';
export {Sizes} from './stories/sizes.stories';
export {Variants} from './stories/variants.stories';
