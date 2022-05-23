import {ellipsis} from 'polished';
import React, {FC, MouseEventHandler} from 'react';
import styled, {css} from 'styled-components';

import {alphas, greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {renderChildrenIgnoreSpecifiedComponents, renderChildrenSpecifiedComponents} from '../../helpers/renderHelpers';
import {Checkbox} from '../checkbox/checkbox';
import {Icon} from '../icon/icon';

/*
 * Constants.
 */

const nonDropdownContentComponents = ['DropdownItemIcon', 'DropdownItemAvatar'];

/*
 * Props.
 */

type DropdownTypes = 'simple' | 'multi';

export interface DropdownItemProps {
  /** Content to render. */
  children: React.ReactNode;
  /** Type of the dropdown item. Default is simple. */
  type?: DropdownTypes;
  /** Height of the content, this is only used for the dropdowns internal logic. This will be auto-calculated if not specified. */
  height?: number;
  /** Whether the dropdown item is selected. */
  isSelected?: boolean;
  /** Called when the dropdown item is clicked. */
  onClick?: MouseEventHandler;
}

/*
 * Style.
 */

const StyledDropdownItemWrapperDiv = styled.div`
  display: grid;
  grid-template-areas: "left-content content right-content";
  grid-template-columns: min-content 1fr min-content;
  height: 100%;
  padding: 0 12px;
  align-items: center;

  &:hover {
    background: ${alphas.gray10};
  }
`;

interface StyledDropdownItemContentWrapperDivProps {
  $isSelected?: boolean;
}

const StyledDropdownItemContentWrapperDiv = styled.div<StyledDropdownItemContentWrapperDivProps>`
  font-family: ${fonts.system};
  grid-area: content;
  color: ${greys.shade80};
  cursor: default;
  line-height: 16px;
  font-size: ${fontSizes.medium};
  ${ellipsis()};

  ${p => p.$isSelected && css`
    font-weight: ${fontWeights.bold};
  `};
`;

const StyledDropdownItemRightContentDiv = styled.div`
  grid-area: right-content;

  &:not(:empty) {
    margin-left: 12px;
  }
`;

/*
 * Component.
 */

export const DropdownItem: FC<DropdownItemProps> = props => {
  const {children, type = 'simple', isSelected, onClick} = props;

  return (
    <StyledDropdownItemWrapperDiv
      onClick={event => {
        // If we are in multi mode, we should not close the dropdown when clicked.
        if (type === 'multi')
          event.preventDefault();
        if (onClick)
          onClick(event);
      }}
    >
      {/* Render non-content items. Avatar, icons, etc. */}
      {renderChildrenSpecifiedComponents(children, nonDropdownContentComponents)}
      {/* Render content items. */}
      <StyledDropdownItemContentWrapperDiv $isSelected={isSelected}>
        {renderChildrenIgnoreSpecifiedComponents(children, nonDropdownContentComponents)}
      </StyledDropdownItemContentWrapperDiv>
      <StyledDropdownItemRightContentDiv>
        {renderSelectedState(type, isSelected)}
      </StyledDropdownItemRightContentDiv>
    </StyledDropdownItemWrapperDiv>
  );
};

/*
 * Helpers.
 */

function renderSelectedState(type: DropdownTypes, isSelected?: boolean) {
  switch (type) {
    case 'multi':
      return <Checkbox isChecked={Boolean(isSelected)} onChange={() => {}} />;
    case 'simple':
    default: {
      if (!isSelected)
        return null;
      return <Icon name="Checkmark" color={palette.blue.shade40} />;
    }
  }
}
