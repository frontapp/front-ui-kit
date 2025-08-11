import {StoryObj} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Icon} from '../../../../elements/icon/icon';
import {Button} from '../../button';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

export const IconBasic: StoryObj<typeof Button> = {
  render: () => (
    <StyledCenteredDiv>
      <Button type="icon">
        <Icon name="Archive" />
      </Button>
    </StyledCenteredDiv>
  )
};
