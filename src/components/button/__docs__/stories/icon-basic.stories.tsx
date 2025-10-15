import {StoryObj} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Icon} from '../../../../elements/icon/icon';
import {Button} from '../../button';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  gap: 16px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledLabel = styled.div`
  font-family: system-ui;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  text-align: center;
  margin-bottom: 8px;
`;

export const IconBasic: StoryObj<typeof Button> = {
  render: () => (
    <StyledContainer>
      <div>
        <StyledLabel>Default (fully rounded)</StyledLabel>
        <StyledCenteredDiv>
          <Button type="icon">
            <Icon name="Archive" />
          </Button>
          <Button type="icon-danger">
            <Icon name="Trash" />
          </Button>
        </StyledCenteredDiv>
      </div>
      <div>
        <StyledLabel>Rounded (8px border radius)</StyledLabel>
        <StyledCenteredDiv>
          <Button type="icon" isRounded>
            <Icon name="Archive" />
          </Button>
          <Button type="icon-danger" isRounded>
            <Icon name="Trash" />
          </Button>
        </StyledCenteredDiv>
      </div>
    </StyledContainer>
  )
};
