import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';

import {useTimeout} from '../../helpers/hookHelpers';
import {TooltipOverflow} from '../tooltip/tooltipOverflow';
import {PopoverContext, PopoverContextProps} from './popoverContext';

/*
 * Tooltip Conditions.
 */

interface TooltipCondition {
  type: 'overflow' | 'explicit';
}

interface TooltipOverflowCondition extends TooltipCondition {
  type: 'overflow';
}

interface TooltipExplicitCondition extends TooltipCondition {
  type: 'explicit';
  isEnabled: boolean;
}

type TooltipAvailableConditions = TooltipOverflowCondition | TooltipExplicitCondition;

/*
 * Props.
 */

interface TooltipCoordinatorProps {
  /** Delay in ms before the tooltip appears. Default is 0. */
  delay?: number;
  /** Children that is wrapped by the tooltip coordinator. */
  children: React.ReactNode;
  /** Conditions that the tooltip would need to pass to be displayed. */
  condition?: TooltipAvailableConditions;
  /** Tooltip to be rendered. */
  renderTooltip: () => React.ReactNode;
}

/*
 * Style.
 */

interface StyledTooltipCoordinatorDivProps {
  $condition?: TooltipAvailableConditions;
}

const StyledTooltipCoordinatorDiv = styled.div<StyledTooltipCoordinatorDivProps>`
  display: ${p => (p.$condition?.type === 'overflow' ? 'block' : 'inline-block')};
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
        {renderWithPotentialConditions(condition, children, isConditionPassed, setIsConditionPassed)}
        {shouldRenderTooltip && isConditionPassed && renderTooltip()}
      </StyledTooltipCoordinatorDiv>
    </PopoverContext.Provider>
  );
};

/*
 * Helpers.
 */

function renderWithPotentialConditions(
  condition: TooltipAvailableConditions | undefined,
  children: React.ReactNode,
  isConditionPassed: boolean,
  onConditionChange: (isConditionPassed: boolean) => void
) {
  if (!condition)
    return children;

  switch (condition.type) {
    // If the type is explicit, set the condition passed to whatever value we currently have.
    case 'explicit': {
      if (isConditionPassed !== condition.isEnabled)
        onConditionChange(condition.isEnabled);
      return children;
    }
    // If the type is overflow, wrap in the tooltip overflow wrapper.
    case 'overflow':
      return (
        <TooltipOverflow onConditionChange={onConditionChange}>
          {children}
        </TooltipOverflow>
      );
    default:
      return children;
  }
}
