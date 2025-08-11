import { StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { EmptyState } from '../../emptyState';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 200px;
`;

export const Basic: StoryObj<typeof EmptyState> = {
  render: () => (
    <StyledWrapperDiv>
      <EmptyState buttonText="Create new issue" onButtonClick={() => { }} />
    </StyledWrapperDiv>
  ),
};
