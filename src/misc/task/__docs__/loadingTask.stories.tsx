import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC} from 'react';
import styled from 'styled-components';

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
