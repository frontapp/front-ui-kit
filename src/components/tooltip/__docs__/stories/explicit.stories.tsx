import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Button} from '../../../button/button';
import {Tooltip} from '../../tooltip';
import {TooltipCoordinator} from '../../tooltipCoordinator';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: column;
  gap: 4px;
  justify-content: center;
  height: 75px;
  text-align: center;
`;

const StyledTooltipWrapperDiv = styled.div``;

const Template: ComponentStory<typeof Tooltip> = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  return (
    <StyledWrapperDiv>
      <Button onClick={() => setIsEnabled(!isEnabled)}>
        Toggle Tooltip
      </Button>
      <StyledTooltipWrapperDiv>
        <TooltipCoordinator
          condition={{
            type: 'explicit',
            isEnabled
          }}
          renderTooltip={() => (
            <Tooltip>
              This is an example tooltip.
            </Tooltip>
          )}
        >
          Hover over me to see tooltip. Is the tooltip enabled? {isEnabled ? 'Yes' : 'No'}
        </TooltipCoordinator>
      </StyledTooltipWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const Explicit = Template.bind({});
