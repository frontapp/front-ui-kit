import {StoryObj} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Skeleton} from '../../skeleton';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

export const Basic: StoryObj<typeof Skeleton> = {
  render: (args) => (
    <StyledWrapperDiv>
      <Skeleton {...args} />
    </StyledWrapperDiv>
  ),
  args: {
    variant: 'dark',
    width: 400,
    height: 40
  }
};
