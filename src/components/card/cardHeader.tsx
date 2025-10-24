import {FC, ReactNode} from 'react';
import styled from 'styled-components';

import {greys} from '../../helpers/colorHelpers';
import {VisualSizesEnum} from '../../helpers/fontHelpers';
import {makeSizeConstants} from '../../helpers/styleHelpers';

/*
 * Props.
 */

export interface CardHeaderProps {
  /** Content to render inside the card header. */
  children?: ReactNode;
  /** The size of the card header. */
  size?: VisualSizesEnum;
  /** Class name to allow custom styling of the card header. */
  className?: string;
  /** Whether the header has a bottom border. */
  hasBorder?: boolean;
}

/*
 * Style.
 */

interface StyledCardHeaderProps {
  $size: VisualSizesEnum;
  $hasBorder: boolean;
}

const headerPadding = makeSizeConstants(0, 0, 0);
const headerMarginBottom = makeSizeConstants(4, 8, 12);
const headerBorderRadius = makeSizeConstants(6, 8, 10);

const StyledCardHeader = styled.div<StyledCardHeaderProps>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${(p) => headerMarginBottom[p.$size]}px;
  padding: ${(p) => headerPadding[p.$size]}px;
  border-radius: ${(p) => headerBorderRadius[p.$size]}px ${(p) => headerBorderRadius[p.$size]}px 0 0;

  /* Border styling */
  border-bottom: ${(p) => (p.$hasBorder ? `1px solid ${greys.shade20}` : 'none')};
  padding-bottom: ${(p) => (p.$hasBorder ? headerMarginBottom[p.$size] : 0)}px;
`;

/*
 * Component.
 */

export const CardHeader: FC<CardHeaderProps> = ({
  children,
  size = VisualSizesEnum.MEDIUM,
  className,
  hasBorder = false
}) => (
  <StyledCardHeader className={className} $size={size} $hasBorder={hasBorder}>
    {children}
  </StyledCardHeader>
);
