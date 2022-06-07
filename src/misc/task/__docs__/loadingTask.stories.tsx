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
  background: ${greys.shade50};
  border-radius: 8px;
  padding: 16px;
  width: 300px;
`;

/*
 * Component.
 */

const LoadingTaskComponent: FC = props => (
  <DefaultStyleProvider>
    <StyledShowcaseDiv>
      <Task
        isLoading
        label=""
      />
    </StyledShowcaseDiv>
  </DefaultStyleProvider>
);

/*
 * Storybook.
 */

export default {
  title: 'Misc/Task',
  component: LoadingTaskComponent
} as ComponentMeta<typeof LoadingTaskComponent>;

const ShowcaseTemplate: ComponentStory<typeof LoadingTaskComponent> = () => <LoadingTaskComponent />;
export const LoadingTask = ShowcaseTemplate.bind({});
LoadingTask.parameters = {
  controls: {hideNoControlsWarning: true}
};
