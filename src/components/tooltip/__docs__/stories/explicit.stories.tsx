import { StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from '../../../../components/button/button';
import { Tooltip } from '../../tooltip';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: column;
  gap: 4px;
  justify-content: center;
  height: 75px;
  text-align: center;
`;

const StyledTooltipWrapperDiv = styled.div``;

const StyledTooltipDiv = styled.div`
  width: 300px;
`;

const Template = () => {
  const [isShown, setIsShown] = useState(false);
  return (
    <StyledTooltipDiv>
      <Tooltip message="An explicit tooltip" isExplicitlyShown={isShown}>
        <Button onClick={() => setIsShown(!isShown)}>Click me to toggle the tooltip</Button>
      </Tooltip>
    </StyledTooltipDiv>
  );
};

export const Explicit: StoryObj<typeof Tooltip> = {
  render: () => <Template />,
};
