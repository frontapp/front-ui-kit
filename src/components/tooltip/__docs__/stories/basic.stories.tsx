import { StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { Tooltip } from '../../tooltip';
import { TooltipCoordinator } from '../../tooltipCoordinator';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 50px;
`;

const StyledTooltipWrapperDiv = styled.div``;

export const Basic: StoryObj<typeof Tooltip> = {
  render: () => (
    <StyledWrapperDiv>
      <StyledTooltipWrapperDiv>
        <TooltipCoordinator renderTooltip={() => <Tooltip>This is an example tooltip.</Tooltip>}>
          Hover over me for a tooltip.
        </TooltipCoordinator>
      </StyledTooltipWrapperDiv>
    </StyledWrapperDiv>
  )
};
