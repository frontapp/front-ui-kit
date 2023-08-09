/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {InfoBanner} from '../infoBanner';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook
 */

export default {
  title: 'Components/Info Banner',
  component: InfoBanner,
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
} as ComponentMeta<typeof InfoBanner>;
