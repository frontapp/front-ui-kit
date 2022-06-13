import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC} from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Task} from '../task';

/*
 * Style.
 */

const StyledShowcaseDiv = styled.div`
  border-radius: 8px;
  padding: 10px;
  width: 300px;
`;

/*
 * Component.
 */

const SimpleTaskComponent: FC = props => (
  <DefaultStyleProvider>
    <StyledShowcaseDiv>
      <Task
        label="Apply changes to feature"
      />
    </StyledShowcaseDiv>
  </DefaultStyleProvider>
);

/*
 * Storybook.
 */

export default {
  title: 'Misc/Task',
  component: SimpleTaskComponent
} as ComponentMeta<typeof SimpleTaskComponent>;

const ShowcaseTemplate: ComponentStory<typeof SimpleTaskComponent> = () => <SimpleTaskComponent />;
export const SimpleTask = ShowcaseTemplate.bind({});
SimpleTask.parameters = {
  controls: {hideNoControlsWarning: true}
};
