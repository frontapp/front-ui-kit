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
  /** Placement of the tooltip. Default is bottom. */
  placement?: Placement;
  /** Max width of the tooltip. */
  maxWidth?: number;
  /** Content of the tooltip to render. */
  children: React.ReactNode;
}

/*
 * Style.
 */

interface StyledTooltipDivProps {
  $maxWidth?: number;
}

const StyledTooltipDiv = styled.div<StyledTooltipDivProps>`
  font-family: ${fonts.system};
  padding: 6px 8px;
  max-width: ${p => `${p.$maxWidth || 400}px`};
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

export const Tooltip: FC<TooltipProps> = props => {
  const {children, placement = 'bottom', maxWidth} = props;

  return (
    <RepositionPopover placement={placement}>
      <StyledTooltipDiv $maxWidth={maxWidth}>
        {children}
      </StyledTooltipDiv>
    </RepositionPopover>
  );
};
