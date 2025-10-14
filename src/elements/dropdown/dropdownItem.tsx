import {ellipsis} from 'polished';
import React, {FC, MouseEventHandler} from 'react';
import styled, {css} from 'styled-components';

import {Checkbox} from '../../components/checkbox/checkbox';
import {alphas, greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {
  renderChildrenIgnoreSpecifiedComponents,
  renderChildrenSpecifiedComponents
} from '../../helpers/renderHelpers';
import {Icon} from '../icon/icon';
import {NavigationalSubmenuTrigger} from './components/NavigationalSubmenuTrigger';
import {SubmenuTrigger} from './components/SubmenuTrigger';
import {NestedDropdownConfig} from './types/nestedDropdown';

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
  /** Type of the dropdown item. */
  type?: DropdownTypes;
  /** Optional description to render for the item. This will be rendered on a second line. */
  description?: string;
  /** Height of the content, this is only used for the dropdowns internal logic. This will be auto-calculated if not specified. */
  height?: number;
  /** Whether the dropdown item is selected. */
  isSelected?: boolean;
  /** Called when the dropdown item is clicked. */
  onClick?: MouseEventHandler;
  /** Submenu content to render on hover. Uses new nested dropdown system if NestedDropdownProvider is available. */
  submenu?: React.ReactNode;
  /** Unique identifier for this submenu (optional, auto-generated if not provided) */
  submenuId?: string;
  /** Parent submenu ID for proper nesting */
  parentSubmenuId?: string;
  /** Custom configuration for this submenu */
  submenuConfig?: Partial<NestedDropdownConfig>;
  /** Called when submenu opens */
  onSubmenuOpen?: (id: string) => void;
  /** Called when submenu closes */
  onSubmenuClose?: (id: string) => void;
  /** Navigation mode for submenus: 'hover' shows submenu on hover (default), 'navigational' replaces current view on click */
  submenuMode?: 'hover' | 'navigational';
  /** Title to show in back button when using navigational mode */
  submenuBackTitle?: string;
}

/*
 * Style.
 */

const StyledDropdownItemWrapperDiv = styled.div`
  display: grid;
  grid-template-areas: 'left-content content right-content';
  grid-template-columns: min-content 1fr min-content;
  height: 100%;
  padding: 0 12px;
  align-items: center;

  &:hover {
    background: ${alphas.gray10};
  }
`;

const StyledDropdownItemContentWrapperDiv = styled.div`
  display: flex;
  flex-flow: column;
  font-family: ${fonts.system};
  grid-area: content;
  cursor: default;
  overflow: hidden;
`;

interface StyledDropdownItemTitleDivProps {
  $isSelected?: boolean;
}

const StyledDropdownItemTitleDiv = styled.div<StyledDropdownItemTitleDivProps>`
  color: ${greys.shade80};
  line-height: 16px;
  font-size: ${fontSizes.medium};
  ${ellipsis()};

  ${(p) =>
    p.$isSelected &&
    css`
      font-weight: ${fontWeights.bold};
    `};
`;

const StyledDropdownItemRightContentDiv = styled.div`
  grid-area: right-content;

  &:not(:empty) {
    margin-left: 12px;
  }
`;

const StyledDropdownItemDescriptionDiv = styled.div`
  color: ${greys.shade70};
  line-height: 16px;
  font-size: ${fontSizes.verySmall};
  ${ellipsis()};
`;

/*
 * Component.
 */

export const DropdownItem: FC<DropdownItemProps> = ({
  children,
  type = 'simple',
  isSelected,
  description,
  onClick,
  submenu,
  submenuId,
  submenuConfig,
  parentSubmenuId,
  onSubmenuOpen,
  onSubmenuClose,
  submenuMode = 'hover',
  submenuBackTitle
}) => {
  // Generate deterministic ID if not provided
  const generatedId = React.useId();
  const effectiveSubmenuId = submenuId ?? `item-${generatedId}`;

  const content = (
    <StyledDropdownItemWrapperDiv
      onClick={(event) => {
        // If we are in multi mode, we should not close the dropdown when clicked.
        if (type === 'multi') {
          event.preventDefault();
          event.stopPropagation();
          // Call onClick after preventing default to ensure state updates still happen
          if (onClick) onClick(event);
          return;
        }
        if (onClick) onClick(event);
      }}>
      {/* Render non-content items. Avatar, icons, etc. */}
      {renderChildrenSpecifiedComponents(children, nonDropdownContentComponents)}
      {/* Render content items. */}
      <StyledDropdownItemContentWrapperDiv>
        <StyledDropdownItemTitleDiv $isSelected={isSelected}>
          {renderChildrenIgnoreSpecifiedComponents(children, nonDropdownContentComponents)}
        </StyledDropdownItemTitleDiv>
        {maybeRenderDescription(description)}
      </StyledDropdownItemContentWrapperDiv>
      <StyledDropdownItemRightContentDiv>
        {renderSelectedState(type, isSelected)}
        {submenu && <Icon name="ChevronRight" color={greys.shade60} />}
      </StyledDropdownItemRightContentDiv>
    </StyledDropdownItemWrapperDiv>
  );

  // If we have a submenu, wrap with the appropriate trigger based on mode
  if (submenu) {
    if (submenuMode === 'navigational')
      return (
        <NavigationalSubmenuTrigger
          submenuId={effectiveSubmenuId}
          getSubmenu={() => submenu}
          backTitle={submenuBackTitle}
          onNavigate={onSubmenuOpen}>
          {content}
        </NavigationalSubmenuTrigger>
      );

    // Default to hover mode
    return (
      <SubmenuTrigger
        submenuId={effectiveSubmenuId}
        submenu={submenu}
        parentSubmenuId={parentSubmenuId}
        onSubmenuOpen={onSubmenuOpen}
        onSubmenuClose={onSubmenuClose}
        submenuConfig={submenuConfig}>
        {content}
      </SubmenuTrigger>
    );
  }

  return content;
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
      if (!isSelected) return null;
      return <Icon name="Checkmark" color={palette.blue.shade40} />;
    }
  }
}

function maybeRenderDescription(description?: string) {
  if (!description) return null;
  return <StyledDropdownItemDescriptionDiv>{description}</StyledDropdownItemDescriptionDiv>;
}

DropdownItem.displayName = 'DropdownItem';
