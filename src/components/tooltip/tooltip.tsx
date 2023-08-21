import {Placement} from '@popperjs/core';
import React, {FC} from 'react';
import styled from 'styled-components';

import {alphas, greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {RepositionPopover} from '../popover/repositionPopover';

/*
 * Props.
 */

interface TooltipProps {
  /** Content of the tooltip to render. */
  children: React.ReactNode;
  /** Placement of the tooltip. */
  placement?: Placement;
  /** Max width of the tooltip. */
  maxWidth?: number;
}

/*
 * Style.
 */

interface StyledTooltipDivProps {
  $maxWidth: number;
}

const StyledTooltipDiv = styled.div<StyledTooltipDivProps>`
  font-family: ${fonts.system};
  padding: 6px 8px;
  max-width: ${(p) => `${p.$maxWidth}px`};
  width: max-content;
  border-radius: 8px;
  background-color: ${greys.shade90};
  box-shadow: 0 2px 4px ${alphas.black40};

  color: ${greys.white};
  font-size: ${fontSizes.verySmall};
  font-weight: ${fontWeights.normal};
  line-height: 16px;
`;

/*
 * Component.
 */

export const Tooltip: FC<TooltipProps> = ({children, placement = 'bottom', maxWidth = 400}) => (
  <RepositionPopover placement={placement}>
    <StyledTooltipDiv $maxWidth={maxWidth}>{children}</StyledTooltipDiv>
  </RepositionPopover>
);
