import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

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
 * Storybook.
 */

const ShowcaseTemplate: ComponentStory<typeof Task> = () => (
  <StyledWrapperDiv>
    <StyledShowcaseDiv>
      <Task type="icon" icon="AttachmentCalendar" label="Apply changes to feature" />
    </StyledShowcaseDiv>
  </StyledWrapperDiv>
);
export const Icon = ShowcaseTemplate.bind({});
