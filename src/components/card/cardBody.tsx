import {FC, ReactNode} from 'react';
import styled from 'styled-components';

import {greys} from '../../helpers/colorHelpers';
import {VisualSizesEnum} from '../../helpers/fontHelpers';
import {makeSizeConstants} from '../../helpers/styleHelpers';

/*
 * Props.
 */

export interface CardBodyProps {
  /** Content to render inside the card body. */
  children?: ReactNode;
  /** The size of the card body. */
  size?: VisualSizesEnum;
  /** Class name to allow custom styling of the card body. */
  className?: string;
  /** Whether the body has padding. */
  hasPadding?: boolean;
}

/*
 * Style.
 */

interface StyledCardBodyProps {
  $size: VisualSizesEnum;
  $hasPadding: boolean;
}

const bodyPadding = makeSizeConstants(0, 0, 0);
const bodyMarginVertical = makeSizeConstants(4, 8, 12);

const StyledCardBody = styled.div<StyledCardBodyProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  margin: ${(p) => (p.$hasPadding ? `${bodyMarginVertical[p.$size]}px 0` : '0')};
  padding: ${(p) => (p.$hasPadding ? `${bodyPadding[p.$size]}px` : '0')};
  color: ${greys.shade80};
`;

/*
 * Component.
 */

export const CardBody: FC<CardBodyProps> = ({
  children,
  size = VisualSizesEnum.MEDIUM,
  className,
  hasPadding = false
}) => (
  <StyledCardBody className={className} $size={size} $hasPadding={hasPadding}>
    {children}
  </StyledCardBody>
);
