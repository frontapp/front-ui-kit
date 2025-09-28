import { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { greys } from '../../helpers/colorHelpers';
import { fonts, fontSizes, fontWeights, VisualSizesEnum } from '../../helpers/fontHelpers';
import { makeSizeConstants } from '../../helpers/styleHelpers';

/*
 * Constants.
 */

const headingFontSizes = makeSizeConstants(
  fontSizes.small,
  fontSizes.medium,
  fontSizes.large,
  fontSizes.veryLarge
);
const lineHeights = makeSizeConstants(16, 16, 20, 30);

/*
 * Props.
 */

interface HeadingProps {
  /** The content of the heading */
  children: ReactNode;
  /** The size of the heading. */
  size?: VisualSizesEnum;
  /** Color of the text. */
  color?: string;
}

/*
 * Style.
 */

interface HeadingStyleProps {
  $size: VisualSizesEnum;
  $color: string;
}

const StyledHeadingDiv = styled.div<HeadingStyleProps>`
  display: block;

  font-size: ${(p) => headingFontSizes[p.$size]};
  font-weight: ${fontWeights.bold};
  font-family: ${fonts.system};
  line-height: ${(p) => `${lineHeights[p.$size]}px`};
  color: ${(p) => p.$color};
`;

/*
 * Component.
 */

export const Heading: FC<HeadingProps> = ({
  children,
  size = VisualSizesEnum.MEDIUM,
  color = greys.shade80
}) => (
  <StyledHeadingDiv $size={size} $color={color}>
    {children}
  </StyledHeadingDiv>
);
