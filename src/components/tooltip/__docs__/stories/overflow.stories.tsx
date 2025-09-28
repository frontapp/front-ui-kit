import {StoryObj} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Input} from '../../../../elements/input/input';
import {greys} from '../../../../helpers/colorHelpers';
import {FormField} from '../../../formField/formField';
import {Tooltip} from '../../tooltip';
import {TooltipCoordinator} from '../../tooltipCoordinator';
import {TooltipOverflow} from '../../tooltipOverflow';

const StyledTooltipDiv = styled.div`
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledTooltipRowWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

interface StyledTooltipWrapperDivProps {
  $width: number;
}

const StyledTooltipWrapperDiv = styled.div<StyledTooltipWrapperDivProps>`
  width: ${(p) => `${p.$width}px`};
  border: 1px solid ${greys.shade30};
  text-align: center;
  padding: 4px;
`;

const Template = () => {
  const [width, setWidth] = useState(350);
  return (
    <StyledTooltipDiv>
      <FormField label="Width of Container">
        <Input type="number" value={width} onChange={(value) => setWidth(Number(value))} />
      </FormField>
      <br />
      <StyledTooltipRowWrapperDiv>
        <StyledTooltipWrapperDiv $width={width}>
          <TooltipCoordinator
            condition={{type: 'overflow'}}
            renderTooltip={() => <Tooltip>This text is smaller.</Tooltip>}>
            This text is smaller.
          </TooltipCoordinator>
        </StyledTooltipWrapperDiv>
      </StyledTooltipRowWrapperDiv>
      <StyledTooltipRowWrapperDiv>
        <StyledTooltipWrapperDiv $width={width}>
          <TooltipCoordinator
            condition={{type: 'overflow'}}
            renderTooltip={() => (
              <Tooltip>This is really long text that is overflowing, looooooooooooooong text.</Tooltip>
            )}>
            This is really long text that is overflowing, looooooooooooooong text.
          </TooltipCoordinator>
        </StyledTooltipWrapperDiv>
      </StyledTooltipRowWrapperDiv>
    </StyledTooltipDiv>
  );
};

export const Overflow: StoryObj<typeof TooltipOverflow> = {
  render: () => <Template />
};
