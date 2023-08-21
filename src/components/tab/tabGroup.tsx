import React, {FC} from 'react';
import styled from 'styled-components';

import {renderChildrenSpecifiedComponents} from '../../helpers/renderHelpers';

/*
 * Props.
 */

interface TabGroupProps {
  /** Tabs to render. Only will render the Tab component. */
  children?: React.ReactNode;
  /** Max width of the group. Defaults to 100% of parent. */
  maxWidth?: number;
}

/*
 * Style.
 */

interface StyledTabGroupWrapperDivProps {
  $maxWidth?: number;
}

const StyledTabGroupWrapperDiv = styled.div<StyledTabGroupWrapperDivProps>`
  display: flex;
  flex-flow: row;
  gap: 16px;
  max-width: ${(p) => (p.$maxWidth ? `${p.$maxWidth}px` : '100%')};
`;

/*
 * Component.
 */

export const TabGroup: FC<TabGroupProps> = ({children, maxWidth}) => {
  const tabGroupContent = renderChildrenSpecifiedComponents(children, ['Tab']);
  return <StyledTabGroupWrapperDiv $maxWidth={maxWidth}>{tabGroupContent}</StyledTabGroupWrapperDiv>;
};
