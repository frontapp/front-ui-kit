import { StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { VisualSizesEnum } from '../../../../helpers/fontHelpers';
import { Button } from '../../button';
import { ButtonGroup } from '../../buttonGroup';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

export const Sizes: StoryObj<typeof Button> = {
  render: () => (
    <StyledCenteredDiv>
      <ButtonGroup>
        <Button type="primary" size={VisualSizesEnum.SMALL}>
          Small Button
        </Button>
        <Button type="primary" size={VisualSizesEnum.MEDIUM}>
          Medium Button
        </Button>
        <Button type="primary" size={VisualSizesEnum.LARGE}>
          Large Button
        </Button>
      </ButtonGroup>
    </StyledCenteredDiv>
  ),
};
