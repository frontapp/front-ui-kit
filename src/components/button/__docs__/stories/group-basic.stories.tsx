import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Button} from '../../button';
import {ButtonGroup} from '../../buttonGroup';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const Template: ComponentStory<typeof Button> = () => (
  <StyledCenteredDiv>
    <ButtonGroup>
      <Button>
        Cancel
      </Button>
      <Button type="primary">
        Submit
      </Button>
    </ButtonGroup>
  </StyledCenteredDiv>
);

export const GroupBasic = Template.bind({});
