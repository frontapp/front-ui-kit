import { StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { Heading } from '../../heading';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

export const Basic: StoryObj<typeof Heading> = {
  render: () => (
    <StyledCenteredDiv>
      <Heading>Example Heading</Heading>
    </StyledCenteredDiv>
  ),
};
