import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Icon} from '../../icon';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const Template: ComponentStory<typeof Icon> = () => (
  <StyledCenteredDiv>
    <Icon name="Archive" />
  </StyledCenteredDiv>
);

export const Basic = Template.bind({});
