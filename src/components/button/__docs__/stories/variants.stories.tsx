import {StoryObj} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Button} from '../../button';
import {ButtonGroup} from '../../buttonGroup';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
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

export const Variants: StoryObj<typeof Button> = {
  render: () => (
    <StyledContainer>
      <div>
        <StyledLabel>Rounded (100px border radius)</StyledLabel>
        <StyledCenteredDiv>
          <ButtonGroup>
            <Button type="secondary" isRounded>
              Secondary
            </Button>
            <Button type="secondary-danger" isRounded>
              Secondary Danger
            </Button>
            <Button type="primary" isRounded>
              Primary
            </Button>
            <Button type="primary-danger" isRounded>
              Primary Danger
            </Button>
            <Button type="tertiary" isRounded>
              Tertiary
            </Button>
          </ButtonGroup>
        </StyledCenteredDiv>
      </div>
      <div>
        <StyledLabel>Default (6px border radius)</StyledLabel>
        <StyledCenteredDiv>
          <ButtonGroup>
            <Button type="secondary">Secondary</Button>
            <Button type="secondary-danger">Secondary Danger</Button>
            <Button type="primary">Primary</Button>
            <Button type="primary-danger">Primary Danger</Button>
            <Button type="tertiary">Tertiary</Button>
          </ButtonGroup>
        </StyledCenteredDiv>
      </div>
      <div>
        <StyledLabel>Force Hovered State (not rounded)</StyledLabel>
        <StyledCenteredDiv>
          <ButtonGroup>
            <Button type="primary" isHovered>
              Primary Hovered
            </Button>
            <Button type="primary-danger" isHovered>
              Primary Danger Hovered
            </Button>
          </ButtonGroup>
        </StyledCenteredDiv>
      </div>
    </StyledContainer>
  )
};
