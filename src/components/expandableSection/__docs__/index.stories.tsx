/* eslint-disable storybook/story-exports */
import {Meta} from '@storybook/react';

import {ExpandableSection} from '../expandableSection';

/*
 * Storybook.
 */

export default {
  title: 'Components/ExpandableSection',
  component: ExpandableSection,
  parameters: {
    previewTabs: {
      canvas: {
        hidden: false
      }
    },
    viewMode: 'story'
  },
  id: 'Components/ExpandableSection'
} as Meta<typeof ExpandableSection>;

export {Basic} from './stories/basic.stories';
export {Controlled} from './stories/basic.stories';
export {MultipleSections} from './stories/basic.stories';
export {Customized} from './stories/basic.stories';
export {ActionsOnHover} from './stories/basic.stories';
export {GroupActions} from './stories/basic.stories';
export {CustomTitleComponent} from './stories/basic.stories';
