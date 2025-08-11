import { StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { Button } from '../../button';
import { ButtonGroup } from '../../buttonGroup';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

export const GroupBasic: StoryObj<typeof Button> = {
  render: () => (
    <StyledCenteredDiv>
      <ButtonGroup>
        <Button>Cancel</Button>
        <Button type="primary">Submit</Button>
      </ButtonGroup>
    </StyledCenteredDiv>
  ),
};
