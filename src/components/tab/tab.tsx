import {ellipsis} from 'polished';
import React, {FC, MouseEventHandler} from 'react';
import styled, {css} from 'styled-components';

import {alphas, greys} from '../../helpers/colorHelpers';
import {fonts, fontWeights} from '../../helpers/fontHelpers';

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
}

/*
 * Style.
 */

interface StyledTabWrapperDivProps {
  $isSelected?: boolean;
}

const StyledTabWrapperDiv = styled.div<StyledTabWrapperDivProps>`
  display: inline-block;
  flex: 1;
  font-family: ${fonts.system};
  position: relative;
  font-weight: ${fontWeights.semibold};
  color: ${greys.shade60};
  overflow: hidden;
  cursor: default;
  text-align: center;

  ${p => p.$isSelected && css`
    color: ${greys.black};
  `}

  &:hover {
    color: ${greys.black};
  }
`;

const StyledTabNameDiv = styled.div`
  margin-bottom: 12px;
  ${ellipsis()}; // TODO: Remove this when we have tooltip support.
`;

interface StyledSelectedBorderDivProps {
  $isSelected?: boolean;
}

const StyledSelectedBorderDiv = styled.div<StyledSelectedBorderDivProps>`
  background: ${alphas.transparent};
  height: 4px;
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;

  ${p => p.$isSelected && css`
    background: ${greys.black};
  `}
`;

/*
 * Component.
 */

// TODO: Add tooltip support for overflowing names.
export const Tab: FC<TabProps> = props => {
  const {name, isSelected, onClick} = props;
  return (
    <StyledTabWrapperDiv $isSelected={isSelected} onClick={onClick}>
      <StyledTabNameDiv>{name}</StyledTabNameDiv>
      <StyledSelectedBorderDiv $isSelected={isSelected} />
    </StyledTabWrapperDiv>
  );
};
