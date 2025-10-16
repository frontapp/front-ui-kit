import {ellipsis} from 'polished';
import {FC, MouseEventHandler} from 'react';
import styled, {css} from 'styled-components';

import {alphas, greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';

/*
 * Props.
 */

interface TabProps {
  /** The name of the tab. */
  name: string;
  /** Whether the tab is selected. */
  isSelected?: boolean;
  /** Called when the tab is clicked. */
  onClick?: MouseEventHandler;
  /** Maximum width of the tab in pixels. */
  maxWidth?: number;
}

/*
 * Style.
 */

interface StyledTabWrapperDivProps {
  $isSelected?: boolean;
  $maxWidth?: number;
}

const StyledTabWrapperDiv = styled.div<StyledTabWrapperDivProps>`
  display: inline-block;
  flex: 1;
  font-family: ${fonts.system};
  position: relative;
  font-weight: ${fontWeights.medium};
  font-size: ${fontSizes.medium};
  color: ${greys.shade60};
  overflow: hidden;
  cursor: default;
  text-align: center;

  ${(p) =>
    p.$maxWidth &&
    css`
      max-width: ${p.$maxWidth}px;
      flex: none;
    `}

  ${(p) =>
    p.$isSelected &&
    css`
      color: ${greys.black};
    `}

  &:hover {
    color: ${greys.black};
  }
`;

const StyledTabNameDiv = styled.div`
  margin-bottom: 6px;
  ${ellipsis()}; // TODO: Remove this when we have tooltip support.
`;

interface StyledSelectedBorderDivProps {
  $isSelected?: boolean;
}

const StyledSelectedBorderDiv = styled.div<StyledSelectedBorderDivProps>`
  background: ${alphas.transparent};
  height: 2.5px;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;

  ${(p) =>
    p.$isSelected &&
    css`
      background: ${greys.black};
    `}
`;

/*
 * Component.
 */

// TODO: Add tooltip support for overflowing names.
export const Tab: FC<TabProps> = (props) => {
  const {name, isSelected, onClick, maxWidth} = props;
  return (
    <StyledTabWrapperDiv $isSelected={isSelected} $maxWidth={maxWidth} onClick={onClick}>
      <StyledTabNameDiv>{name}</StyledTabNameDiv>
      <StyledSelectedBorderDiv $isSelected={isSelected} />
    </StyledTabWrapperDiv>
  );
};
