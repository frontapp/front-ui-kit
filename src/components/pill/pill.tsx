import React, {FC, MouseEventHandler} from 'react';
import styled, {css} from 'styled-components';

import {alphas, greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes} from '../../helpers/fontHelpers';
import {isComponentInChildren} from '../../helpers/renderHelpers';
import {getBackgroundColorFromStyles, getTextColorFromStyles, SelectableComponentColors} from '../../helpers/styleHelpers';
import {PillContent} from './pillContent';

/*
 * Constants.
 */

const defaultPillColors: SelectableComponentColors = {
  textColor: greys.shade90,
  selectedTextColor: greys.white,
  backgroundColor: alphas.black30,
  hoverBackgroundColor: alphas.black40,
  selectedBackgroundColor: greys.shade70
};

/*
 * Props.
 */

interface PillProps {
  /** Whether we should render the selected variant of the colors. */
  isSelected?: boolean;
  /** Custom colors for different states. Note, disabled is not supported. Default is a grey variant. */
  colors?: SelectableComponentColors;
  /** Content to render for the pill. */
  children: React.ReactNode;
  /** Called when the pill is clicked. */
  onClick?: MouseEventHandler;
}

/*
 * Style.
 */

interface StyledPillDivProps {
  $colors: SelectableComponentColors;
  $isSelected?: boolean;
}

const StyledPillDiv = styled.div<StyledPillDivProps>`
  padding: 3px 6px;
  border-radius: 100px;
  border-radius: 4px;
  display: inline-grid;
  grid-template-areas: "left-content content right-content";
  font-family: ${fonts.system};
  box-sizing: border-box;
  font-size: ${fontSizes.medium};
  user-select: none;
  line-height: 16px;

  ${p => addPillStyles(p.$colors, p.$isSelected)}
`;

function addPillStyles(colors: SelectableComponentColors, isSelected?: boolean) {
  if (isSelected)
    return css`
      color: ${getTextColorFromStyles(colors, 'selected')};
      background-color: ${getBackgroundColorFromStyles(colors, 'selected')};
    `;
  return css`
    color: ${getTextColorFromStyles(colors)};
    background-color: ${getBackgroundColorFromStyles(colors)};

    &:hover {
      color: ${getTextColorFromStyles(colors, 'hover')};
      background-color: ${getBackgroundColorFromStyles(colors, 'hover')};
    }
  `;
}

/*
 * Component.
 */

export const Pill: FC<PillProps> = props => {
  const {children, colors = defaultPillColors, isSelected, onClick} = props;

  return (
    <StyledPillDiv $colors={colors} $isSelected={isSelected} onClick={onClick}>
      {renderPillChildren(children)}
    </StyledPillDiv>
  );
};

/*
 * Helpers.
 */

/** Renders the children and checks if we need to wrap the passed in children in the PillContent. */
function renderPillChildren(children: React.ReactNode) {
  const shouldWrapInContent = !isComponentInChildren(children, 'PillContent');
  if (!shouldWrapInContent)
    return children;
  return <PillContent>{children}</PillContent>;
}
