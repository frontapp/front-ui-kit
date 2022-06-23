import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Heading} from '../../heading';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const Template: ComponentStory<typeof Heading> = () => (
  <StyledCenteredDiv>
    <Heading>Example Heading</Heading>
  </StyledCenteredDiv>
);

export const Basic = Template.bind({});
