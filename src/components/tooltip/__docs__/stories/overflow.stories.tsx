import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Input} from '../../../../elements/input/input';
import {greys} from '../../../../helpers/colorHelpers';
import {FormField} from '../../../formField/formField';
import {Tooltip} from '../../tooltip';
import {TooltipCoordinator} from '../../tooltipCoordinator';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  gap: 8px;
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

const Template: ComponentStory<typeof Tooltip> = () => {
  const [width, setWidth] = useState(350);
  return (
    <StyledWrapperDiv>
      <FormField label="Width of Container">
        <Input<number> type="number" value={width} onChange={setWidth} />
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
    </StyledWrapperDiv>
  );
};

export const Overflow = Template.bind({});
