import React, {FC} from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';

/*
 * Props.
 */

interface PluginFooterProps {
  children: React.ReactNode;
}

/*
 * Style.
 */

const StyledFooterWrapperDiv = styled.div`
  grid-area: plugin-footer;
  border-top: 1px solid ${greys.shade30};
  padding: 20px;
`;

/*
 * Component.
 */

export const PluginFooter: FC<PluginFooterProps> = ({children}) => (
  <StyledFooterWrapperDiv>{children}</StyledFooterWrapperDiv>
);
