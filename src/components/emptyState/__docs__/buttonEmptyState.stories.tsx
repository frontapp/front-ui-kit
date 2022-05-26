import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';
import {EmptyState} from '../emptyState';

const StyledEmptyStateWrapperDiv = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  border-radius: 8px;
  background: ${greys.white};
`;

export default {
  title: 'Components/Empty State',
  component: EmptyState,
  argTypes: {
    onButtonClick: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof EmptyState>;

const Template: ComponentStory<typeof EmptyState> = args => (
  <StyledEmptyStateWrapperDiv>
    <EmptyState {...args} />
  </StyledEmptyStateWrapperDiv>
);

export const WithButton = Template.bind({});
WithButton.args = {
  buttonText: 'Create item "abc"',
  message: "Something went wrong."
};
