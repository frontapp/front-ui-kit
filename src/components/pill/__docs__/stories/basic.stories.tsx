import {StoryObj} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Pill} from '../../pill';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

export const Basic: StoryObj<typeof Pill> = {
  render: (args) => (
    <StyledWrapperDiv>
      <Pill {...args}>Example Pill</Pill>
    </StyledWrapperDiv>
  )
};
