import React, {FC, ReactNode} from 'react';
import styled from 'styled-components';

import {greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights, VisualSizesEnum} from '../../helpers/fontHelpers';
import {makeSizeConstants} from '../../helpers/styleHelpers';

/*
 * Constants.
 */

const headingFontSizes = makeSizeConstants(fontSizes.small, fontSizes.medium, fontSizes.large, fontSizes.veryLarge);
const lineHeights = makeSizeConstants(16, 16, 20, 30);

/*
 * Props.
 */

interface HeadingProps {
  /** The content of the heading */
  children: ReactNode;
  /** The size of the heading. */
  size?: VisualSizesEnum;
}

/*
 * Style.
 */

interface HeadingStyleProps {
  $size: VisualSizesEnum;
}

const StyledHeadingDiv = styled.div<HeadingStyleProps>`
  display: inline-block;

  font-size: ${p => headingFontSizes[p.$size]};
  font-weight: ${fontWeights.bold};
  font-family: ${fonts.system};
  line-height: ${p => `${lineHeights[p.$size]}px`};
  color: ${greys.shade80};
`;

/*
 * Component.
 */

export const Heading: FC<HeadingProps> = props => (
  <StyledHeadingDiv $size={props.size || VisualSizesEnum.MEDIUM}>
    {props.children}
  </StyledHeadingDiv>
);
