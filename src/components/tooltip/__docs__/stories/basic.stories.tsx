import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Tooltip} from '../../tooltip';
import {TooltipCoordinator} from '../../tooltipCoordinator';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 50px;
`;

const StyledTooltipWrapperDiv = styled.div``;

const Template: ComponentStory<typeof Tooltip> = () => (
  <StyledWrapperDiv>
    <StyledTooltipWrapperDiv>
      <TooltipCoordinator renderTooltip={() => <Tooltip>This is an example tooltip.</Tooltip>}>
        Hover over me for a tooltip.
      </TooltipCoordinator>
    </StyledTooltipWrapperDiv>
  </StyledWrapperDiv>
);

export const Basic = Template.bind({});
