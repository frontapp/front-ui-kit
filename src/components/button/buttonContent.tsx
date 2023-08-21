import React, {FC} from 'react';
import styled from 'styled-components';

/*
 * Props.
 */

interface ButtonContentProps {
  /** Button content to render. */
  children: React.ReactNode;
}

/*
 * Style.
 */

const StyledButtonContentDiv = styled.div`
  grid-area: content;
`;

/*
 * Component.
 */

export const ButtonContent: FC<ButtonContentProps> = ({children}) => (
  <StyledButtonContentDiv>{children}</StyledButtonContentDiv>
);
