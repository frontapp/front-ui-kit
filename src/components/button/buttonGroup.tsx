import React, {FC} from 'react';
import styled, {css} from 'styled-components';

/*
 * Props.
 */

interface ButtonGroupProps {
  /** How to align the buttons. Default is left. */
  align?: 'left' | 'right';
  /** Buttons to render. */
  children: React.ReactNode;
}

/*
 * Style.
 */

interface StyledButtonGroupDivProps {
  $align: 'left' | 'right';
}

const StyledButtonGroupDiv = styled.div<StyledButtonGroupDivProps>`
  display: flex;
  flex-flow: row;
  gap: 8px;

  ${p => css`
    justify-content: ${p.$align === 'left' ? 'unset' : 'end'};
  `};
`;

/*
 * Component.
 */

export const ButtonGroup: FC<ButtonGroupProps> = ({children, align = 'left'}) => (
  <StyledButtonGroupDiv $align={align}>{children}</StyledButtonGroupDiv>
);
