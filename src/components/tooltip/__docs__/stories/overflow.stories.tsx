import {StoryObj} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Button} from '../../../../components/button/button';
import {TooltipOverflow} from '../../tooltipOverflow';

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

const StyledTooltipDiv = styled.div`
  width: 100px;
`;

const StyledOverflowDiv = styled.div`
  width: 100px;
`;

const Template = () => {
  const [isLong, setIsLong] = useState(false);

  return (
    <StyledWrapperDiv>
      <Button onClick={() => setIsLong(!isLong)}>Toggle Text Length</Button>
      <StyledTooltipDiv>
        <TooltipOverflow message={isLong ? 'This is a long message that will overflow' : 'Short'}>
          {(ref) => (
            <StyledOverflowDiv ref={ref}>
              {isLong ? 'This is a long message that will overflow' : 'Short'}
            </StyledOverflowDiv>
          )}
        </TooltipOverflow>
      </StyledTooltipDiv>
    </StyledWrapperDiv>
  );
};

export const Overflow: StoryObj<typeof TooltipOverflow> = {
  render: () => <Template />
};
