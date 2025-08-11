import { StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { Icon } from '../../icon';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

export const Basic: StoryObj<typeof Icon> = {
  render: () => (
    <StyledCenteredDiv>
      <Icon name="Archive" />
    </StyledCenteredDiv>
  ),
};
