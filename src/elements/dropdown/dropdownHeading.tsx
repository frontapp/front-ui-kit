import React, { FC } from 'react';
import styled from 'styled-components';

import { greys } from '../../helpers/colorHelpers';
import { fonts, fontSizes, fontWeights } from '../../helpers/fontHelpers';

/*
 * Props.
 */

export interface DropdownHeadingProps {
  /** Content to render for the heading. */
  children: React.ReactNode;
}

/*
 * Style.
 */

const StyledDropdownHeadingDiv = styled.div`
  display: flex;
  align-items: center;
  font-family: ${fonts.system};
  color: ${greys.shade60};
  font-size: ${fontSizes.verySmall};
  font-weight: ${fontWeights.semibold};
  padding: 0 12px;
  height: 100%;
`;

/*
 * Component.
 */

export const DropdownHeading: FC<DropdownHeadingProps> = ({ children }) => (
  <StyledDropdownHeadingDiv onClick={(event) => event.preventDefault()}>{children}</StyledDropdownHeadingDiv>
);

DropdownHeading.displayName = 'DropdownHeading';
