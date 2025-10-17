import {FC, ReactNode} from 'react';
import styled from 'styled-components';

import {greys} from '../../helpers/colorHelpers';
import {VisualSizesEnum} from '../../helpers/fontHelpers';
import {makeSizeConstants} from '../../helpers/styleHelpers';

/*
 * Props.
 */

export interface CardFooterProps {
  /** Content to render inside the card footer. */
  children?: ReactNode;
  /** The size of the card footer. */
  size?: VisualSizesEnum;
  /** Class name to allow custom styling of the card footer. */
  className?: string;
  /** Whether the footer has a top border. */
  hasBorder?: boolean;
}

/*
 * Style.
 */

interface StyledCardFooterProps {
  $size: VisualSizesEnum;
  $hasBorder: boolean;
}

const footerPadding = makeSizeConstants(0, 0, 0);
const footerMarginTop = makeSizeConstants(8, 12, 16);
const footerBorderRadius = makeSizeConstants(6, 8, 10);

const StyledCardFooter = styled.div<StyledCardFooterProps>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: ${(p) => footerMarginTop[p.$size]}px;
  padding: ${(p) => footerPadding[p.$size]}px;
  border-radius: 0 0 ${(p) => footerBorderRadius[p.$size]}px ${(p) => footerBorderRadius[p.$size]}px;

  /* Border styling */
  border-top: ${(p) => (p.$hasBorder ? `1px solid ${greys.shade20}` : 'none')};
  padding-top: ${(p) => (p.$hasBorder ? footerMarginTop[p.$size] : 0)}px;
`;

/*
 * Component.
 */

export const CardFooter: FC<CardFooterProps> = ({
  children,
  size = VisualSizesEnum.MEDIUM,
  className,
  hasBorder = false
}) => (
  <StyledCardFooter className={className} $size={size} $hasBorder={hasBorder}>
    {children}
  </StyledCardFooter>
);
