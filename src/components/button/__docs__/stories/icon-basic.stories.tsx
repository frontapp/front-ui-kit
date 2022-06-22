import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Icon} from '../../../icon/icon';
import {Button} from '../../button';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const Template: ComponentStory<typeof Button> = () => (
  <StyledCenteredDiv>
    <Button type="icon">
      <Icon name="Archive" />
    </Button>
  </StyledCenteredDiv>
);

export const IconBasic = Template.bind({});
