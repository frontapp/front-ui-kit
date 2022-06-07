import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { greys } from '../../../helpers/colorHelpers';
import { DefaultStyleProvider } from '../../../utils/defaultStyleProvider';

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

const SimpleTaskComponent: FC = props => {
  return (
    <DefaultStyleProvider>
      <StyledShowcaseDiv>
        <Task
          label="Apply changes to feature"
        />
      </StyledShowcaseDiv>
    </DefaultStyleProvider>
  );
};

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
