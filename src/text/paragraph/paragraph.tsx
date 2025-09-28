import { FC, ReactNode } from 'react';
import styled from 'styled-components';

import { greys } from '../../helpers/colorHelpers';
import { fonts, fontSizes, fontWeights } from '../../helpers/fontHelpers';

/*
 * Constants.
 */

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
  display: block;

  font-size: ${fontSizes.medium};
  font-weight: ${(p) => (p.$isBold ? fontWeights.bold : fontWeights.normal)};
  font-family: ${fonts.system};
  line-height: 16px;
  color: ${(p) => p.$color};
`;

/*
 * Component.
 */

export const Paragraph: FC<ParagraphProps> = (props) => (
  <StyledParagraphDiv $color={props.color || defaultColor} $isBold={props.isBold || false}>
    {props.children}
  </StyledParagraphDiv>
);
