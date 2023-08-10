/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {InlineBanner} from '../inlineBanner';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook
 */

export default {
  title: 'Components/Inline Banner',
  id: 'Components/Inline Banner',
  component: InlineBanner,
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
  }
} as ComponentMeta<typeof InlineBanner>;

export {Basic} from './stories/basic.stories';
export {Success, Error, Warning, Info} from './stories/showcase.stories';
