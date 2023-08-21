import React, {FC} from 'react';
import styled from 'styled-components';

/*
 * Props.
 */

interface PillContentProps {
  /** Children to render. */
  children: React.ReactNode;
}

/*
 * Style.
 */

const StyledPillContentDiv = styled.div`
  grid-area: content;
`;

/*
 * Component.
 */

export const PillContent: FC<PillContentProps> = ({children}) => (
  <StyledPillContentDiv>{children}</StyledPillContentDiv>
);
