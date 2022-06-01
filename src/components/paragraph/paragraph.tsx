import React, {FC, ReactNode} from 'react';
import styled from 'styled-components';

import {greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {makeSizeConstants} from '../../helpers/styleHelpers';

/*
 * Constants.
 */

const headingFontSizes = makeSizeConstants(fontSizes.small, fontSizes.medium, fontSizes.large, fontSizes.veryLarge);
const lineHeights = makeSizeConstants(16, 16, 20, 30);

const defaultColor = greys.shade80;

/*
 * Props.
 */

interface ParagraphProps {
  /** The content of the paragraph */
  children: ReactNode;
  /** The color of the text. */
  color?: string;
  /** Whether the text is bold */
  isBold?: boolean;
}

/*
 * Style.
 */

interface ParagraphStyleProps {
  $isBold: boolean;
  $color: string;
}

const StyledParagraphDiv = styled.div<ParagraphStyleProps>`
  display: inline-block;

  font-size: ${fontSizes.medium};
  font-weight: ${p => (p.$isBold ? fontWeights.bold : fontWeights.normal)};
  font-family: ${fonts.system};
  line-height: 16px;
  color: ${p => p.$color};
`;

/*
 * Component.
 */

export const Paragraph: FC<ParagraphProps> = props => (
  <StyledParagraphDiv $color={props.color || defaultColor} $isBold={props.isBold || false}>
    {props.children}
  </StyledParagraphDiv>
);
