import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Paragraph} from '../../paragraph';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const Template: ComponentStory<typeof Paragraph> = () => (
  <StyledCenteredDiv>
    <Paragraph>Example Paragraph</Paragraph>
  </StyledCenteredDiv>
);

export const Basic = Template.bind({});
