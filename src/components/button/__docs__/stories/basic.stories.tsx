import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Button} from '../../button';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const Template: ComponentStory<typeof Button> = () => (
  <StyledCenteredDiv>
    <Button>
      Example
    </Button>
  </StyledCenteredDiv>
);

export const Basic = Template.bind({});
