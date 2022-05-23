import React, {FC} from 'react';
import styled from 'styled-components';

import {alphas} from '../../helpers/colorHelpers';

/*
 * Props.
 */

interface DropdownFooterProps {
  children: React.ReactNode;
}

/*
 * Style.
 */

const StyledDropdownFooterWrapperDiv = styled.div`
  grid-area: footer;
  border-top: 1px solid ${alphas.black20};
  padding: 12px;
`;

/*
 * Component.
 */

export const DropdownFooter: FC<DropdownFooterProps> = ({children}) => <StyledDropdownFooterWrapperDiv>{children}</StyledDropdownFooterWrapperDiv>;