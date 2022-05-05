import React, {FC} from 'react';
import styled from 'styled-components';

/*
 * Props.
 */

interface ButtonGroupProps {
  /** Children to render. */
  children: React.ReactNode;
}

/*
 * Style.
 */

const StyledButtonGroupDiv = styled.div`
  display: flex;
  flex-flow: row;
  gap: 8px;
`;

/*
 * Component.
 */

export const ButtonGroup: FC<ButtonGroupProps> = ({children}) => <StyledButtonGroupDiv>{children}</StyledButtonGroupDiv>;
