import {ellipsis} from 'polished';
import {FC, MouseEventHandler} from 'react';
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
  /** Margin bottom for the tab name. Defaults to 11px. */
  marginBottom?: number;
  /** Height of the selected indicator. Defaults to 4px. */
  selectedIndicatorHeight?: number;
  /** Width of the selected indicator. Defaults to 50%. */
  selectedIndicatorWidth?: string;
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
  font-size: 14px;
  color: ${greys.shade60};
  overflow: hidden;
  cursor: default;
  text-align: center;

  ${(p) =>
    p.$isSelected &&
    css`
      color: ${greys.black};
    `}

  &:hover {
    color: ${greys.black};
  }
`;

interface StyledTabNameDivProps {
  $marginBottom?: number;
}

const StyledTabNameDiv = styled.div<StyledTabNameDivProps>`
  margin-bottom: ${(p) => p.$marginBottom || 11}px;
  ${ellipsis()}; // TODO: Remove this when we have tooltip support.
`;

interface StyledSelectedBorderDivProps {
  $isSelected?: boolean;
  $selectedIndicatorHeight?: number;
  $selectedIndicatorWidth?: string;
}

const StyledSelectedBorderDiv = styled.div<StyledSelectedBorderDivProps>`
  background: ${alphas.transparent};
  height: ${(p) => p.$selectedIndicatorHeight || 4}px;
  width: ${(p) => p.$selectedIndicatorWidth || '50%'};
  justify-self: center;
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
  const {name, isSelected, onClick, marginBottom, selectedIndicatorHeight, selectedIndicatorWidth} = props;
  return (
    <StyledTabWrapperDiv $isSelected={isSelected} onClick={onClick}>
      <StyledTabNameDiv $marginBottom={marginBottom}>{name}</StyledTabNameDiv>
      <StyledSelectedBorderDiv
        $isSelected={isSelected}
        $selectedIndicatorHeight={selectedIndicatorHeight}
        $selectedIndicatorWidth={selectedIndicatorWidth}
      />
    </StyledTabWrapperDiv>
  );
};
