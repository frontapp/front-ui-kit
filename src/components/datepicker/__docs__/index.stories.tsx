/* eslint-disable storybook/story-exports */
import {ComponentMeta} from '@storybook/react';

import {DatePickerDropdown} from '../datepickerDropdown';
import DocumentationMDX from './docs.mdx';

/*
 * Storybook.
 */

export default {
  title: 'Components/Date Picker',
  component: DatePickerDropdown,
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
  id: 'Components/Date Picker'
} as ComponentMeta<typeof DatePickerDropdown>;

export {Basic} from './stories/basic.stories';
export {MinMaxDate} from './stories/min-max-date.stories';
export {StartDate} from './stories/start-date.stories';
export {TwentyFourHour} from './stories/twenty-four-hour.stories';
