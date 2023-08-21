import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Pill} from '../../pill';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const Template: ComponentStory<typeof Pill> = (args) => (
  <StyledWrapperDiv>
    <Pill {...args}>Example Pill</Pill>
  </StyledWrapperDiv>
);

export const Basic = Template.bind({});
