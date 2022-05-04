import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';

import {useTimeout} from '../../helpers/hookHelpers';
import {TooltipOverflow} from '../tooltip/tooltipOverflow';
import {PopoverContext, PopoverContextProps} from './popoverContext';

/*
 * Props.
 */

type TooltipCoordinatorConditions = 'overflow';

interface TooltipCoordinatorProps {
  /** Delay in ms before the tooltip appears. Default is 0. */
  delay?: number;
  /** Children that is wrapped by the tooltip coordinator. */
  children: React.ReactNode;
  /** Conditions for if the tooltip show show itself. Default is no condition. */
  condition?: TooltipCoordinatorConditions;
  /** Tooltip to be rendered. */
  renderTooltip: () => React.ReactNode;
}

/*
 * Style.
 */

interface StyledTooltipCoordinatorDivProps {
  $condition?: TooltipCoordinatorConditions;
}

const StyledTooltipCoordinatorDiv = styled.div<StyledTooltipCoordinatorDivProps>`
  display: ${p => (p.$condition === 'overflow' ? 'block' : 'inline-block')};
`;

/*
 * Component.
 */

export const TooltipCoordinator: FC<TooltipCoordinatorProps> = props => {
  const {children, delay = 0, condition, renderTooltip} = props;

  const [anchorElement, setAnchorElement] = useState<HTMLDivElement | null>(null);
  const [shouldRenderTooltip, setShouldRenderTooltip] = useState(false);
  const [isConditionPassed, setIsConditionPassed] = useState(!condition);
  const [context, setContext] = useState<PopoverContextProps | undefined>();

  const [setSafeTimeout, clearSafeTimeout] = useTimeout();

  useEffect(() => {
    if (!anchorElement)
      return;
    setContext({
      anchor: anchorElement
    });
  }, [anchorElement]);

  const onMouseEnter = () => {
    setSafeTimeout(() => {
      setShouldRenderTooltip(true);
    }, delay);
  };

  const onMouseLeave = () => {
    clearSafeTimeout();
    setShouldRenderTooltip(false);
  };

  return (
    <PopoverContext.Provider value={context}>
      <StyledTooltipCoordinatorDiv $condition={condition} ref={setAnchorElement} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {renderWithPotentialConditions(condition, children, setIsConditionPassed)}
        {shouldRenderTooltip && isConditionPassed && renderTooltip()}
      </StyledTooltipCoordinatorDiv>
    </PopoverContext.Provider>
  );
};

/*
 * Helpers.
 */

function renderWithPotentialConditions(
  condition: TooltipCoordinatorConditions | undefined,
  children: React.ReactNode,
  onConditionChange: (isConditionPassed: boolean) => void
) {
  if (condition === 'overflow')
    return (
      <TooltipOverflow onConditionChange={onConditionChange}>
        {children}
      </TooltipOverflow>
    );
  return children;
}
