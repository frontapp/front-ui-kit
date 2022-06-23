import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Tab} from '../../tab';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const StyledTabWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  width: 100px;
`;

const Template: ComponentStory<typeof Tab> = args => (
  <StyledWrapperDiv>
    <StyledTabWrapperDiv>
      <Tab {...args} />
    </StyledTabWrapperDiv>
  </StyledWrapperDiv>
);

export const Basic = Template.bind({});
Basic.args = {
  name: "Example Tab",
  isSelected: true
};
