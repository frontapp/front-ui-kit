import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Skeleton} from '../../skeleton';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <StyledWrapperDiv>
    <Skeleton {...args} />
  </StyledWrapperDiv>
);

export const Basic = Template.bind({});
Basic.args = {
  variant: 'dark',
  width: 400,
  height: 40
};
