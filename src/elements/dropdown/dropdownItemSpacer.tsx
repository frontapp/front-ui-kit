import {FC} from 'react';
import styled from 'styled-components';

import {greys} from '../../helpers/colorHelpers';

/*
 * Style.
 */

const StyledDropdownItemSpacerDiv = styled.div`
  height: 1px;
  background: ${greys.shade30};
  margin: 8px 0;
`;

/*
 * Component.
 */

export const DropdownItemSpacer: FC = () => <StyledDropdownItemSpacerDiv />;

DropdownItemSpacer.displayName = 'DropdownItemSpacer';
