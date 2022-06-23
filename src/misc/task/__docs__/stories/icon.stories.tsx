import {ComponentStory} from '@storybook/react';
import React, {FC} from 'react';
import styled from 'styled-components';

import {DefaultStyleProvider} from '../../../../utils/defaultStyleProvider';
import {Task} from '../../task';

/*
 * Style.
 */

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

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
    <StyledWrapperDiv>
      <StyledShowcaseDiv>
        <Task
          type="icon"
          icon="AttachmentCalendar"
          label="Apply changes to feature"
        />
      </StyledShowcaseDiv>
    </StyledWrapperDiv>
  </DefaultStyleProvider>
);

/*
 * Storybook.
 */

const ShowcaseTemplate: ComponentStory<typeof SimpleTaskComponent> = () => <SimpleTaskComponent />;
export const Icon = ShowcaseTemplate.bind({});
