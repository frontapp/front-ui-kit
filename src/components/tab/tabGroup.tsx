import React, {FC} from 'react';
import * as ReactIs from "react-is";
import styled from 'styled-components';

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
  max-width: ${p => (p.$maxWidth ? `${p.$maxWidth}px` : '100%')};
`;

/*
 * Component.
 */

export const TabGroup: FC<TabGroupProps> = ({children, maxWidth}) => (
  <StyledTabGroupWrapperDiv $maxWidth={maxWidth}>{renderTabGroupContent(children)}</StyledTabGroupWrapperDiv>
);

/*
 * Helpers.
 */

function renderTabGroupContent(children: React.ReactNode) {
  return React.Children.toArray(children).map(child => {
    if (typeof child === 'string' || typeof child === 'number')
      return null;
    if (ReactIs.isFragment(child) || !ReactIs.isElement(child))
      return null;

    // Only allow tabs to be rendered.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
    if ((child.type as any)?.displayName === 'Tab')
      return child;

    return null;
  });
}
