/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {FormField} from '../formField';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Form Field',
  component: FormField,
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
  id: 'Components/Form Field'
} as ComponentMeta<typeof FormField>;

export {Basic} from './stories/basic.stories';
export {Erred} from './stories/erred.stories';
export {Required} from './stories/required.stories';
export {Multiple} from './stories/multiple.stories';
