import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {Icon, IconName} from '../../elements/icon/icon';
import {greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {ActionMenu} from '../_pre-built/actionMenu/actionMenu';
import {ActionMenuItem} from '../_pre-built/actionMenu/actionMenuItem';
import {Button} from '../button/button';
import {Tooltip} from '../tooltip/tooltip';
import {TooltipCoordinator} from '../tooltip/tooltipCoordinator';

/*
 * Props
 */

export interface ExpandableSectionAction {
  /** The label for the action. */
  label: string;
  /** The icon name for the action. */
  icon?: IconName;
  /** The tooltip text for the action (optional, defaults to label). */
  tooltip?: string;
  /** Called when the action is clicked. */
  onClick: () => void;
}

interface ExpandableSectionProps {
  /** Contents of the section to be rendered. */
  children: React.ReactNode;
  /** The title to render for the expandable section. */
  title: React.ReactNode;
  /** Controls whether the section is expanded or not. */
  isOpen?: boolean;
  /** Called when the section is opened/closed. */
  onToggle?: (isOpen: boolean) => void;
  /** Optional actions to display on the right side of the header. */
  actions?: ExpandableSectionAction[];
  /** Whether to show the text before the icon (default: false) */
  showTextBeforeIcon?: boolean;
  /** Custom icon name to use instead of the default CaretExpand. If empty or undefined, no icon will be shown. */
  iconName?: 'CaretExpand' | 'ChevronDown' | '';
  /** Border radius for the expandable section (default: 8px) */
  borderRadius?: string;
  /** Background color for the header on hover (default: greys.shade10) */
  hoverBackgroundColor?: string;
  /** Whether to show the border around the expandable section (default: true) */
  showBorder?: boolean;
  /** Whether to show the border between header and content when expanded (default: true) */
  showContentBorder?: boolean;
  /** Maximum height when expanded (default: 1000px) */
  maxHeight?: string;
  /** Background color for the expandable section (default: greys.white) */
  backgroundColor?: string;
  /** Whether actions should only be visible on hover (default: false - actions always visible). */
  showActionsOnHover?: boolean;
  /** Whether to group actions into a dropdown menu (default: false - show as individual icon buttons). */
  groupActions?: boolean;
}

/*
 * Styles
 */

const StyledExpandableSectionDiv = styled.div<{
  borderRadius?: string;
  showBorder?: boolean;
  backgroundColor?: string;
}>`
  display: flex;
  flex-direction: column;
  border: ${({showBorder = true}) => (showBorder ? `1px solid ${greys.shade30}` : 'none')};
  border-radius: ${({borderRadius}) => borderRadius || '8px'};
  background: ${({backgroundColor}) => backgroundColor || greys.white};
  overflow: hidden;
`;

const StyledHeaderDiv = styled.div<{hoverBackgroundColor?: string}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({hoverBackgroundColor}) => hoverBackgroundColor || greys.shade10};
  }
`;

const StyledTitleContainerDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const StyledTitleDiv = styled.div`
  font-family: ${fonts.system};
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.medium};
  line-height: 24px;
`;

const StyledCaretIconDiv = styled.div<{isOpen: boolean}>`
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
  transform: ${({isOpen}) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const StyledActionsDiv = styled.div<{$showOnHover?: boolean}>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 16px;
  opacity: ${({$showOnHover}) => ($showOnHover ? 0 : 1)};
  transition: opacity 0.2s ease;

  /* Show on parent hover (only if showOnHover is true) */
  ${({$showOnHover}) =>
    $showOnHover &&
    `${StyledHeaderDiv}:hover & {
    opacity: 1;
  }`}
`;

const StyledContentDiv = styled.div<{isOpen: boolean; showContentBorder?: boolean; maxHeight?: string}>`
  border-top: ${({showContentBorder = true}) => (showContentBorder ? `1px solid ${greys.shade20}` : 'none')};
  overflow: hidden;
  max-height: ${({isOpen, maxHeight = '1000px'}) => (isOpen ? maxHeight : '0')};
  opacity: ${({isOpen}) => (isOpen ? '1' : '0')};
`;

/*
 * Component
 */

export const ExpandableSection: FC<ExpandableSectionProps> = (props) => {
  const {
    children,
    title,
    isOpen: controlledIsOpen,
    onToggle,
    actions = [],
    showTextBeforeIcon = false,
    iconName = 'CaretExpand',
    borderRadius,
    hoverBackgroundColor,
    showBorder = true,
    showContentBorder = true,
    maxHeight = '1000px',
    backgroundColor,
    showActionsOnHover = false,
    groupActions = false
  } = props;
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    if (controlledIsOpen === undefined) setInternalIsOpen(newIsOpen);
    if (onToggle) onToggle(newIsOpen);
  };

  const handleActionClick = (action: ExpandableSectionAction) => {
    action.onClick();
  };

  const titleElement = typeof title === 'string' ? <StyledTitleDiv>{title}</StyledTitleDiv> : title;
  const iconElement = iconName ? (
    <StyledCaretIconDiv isOpen={isOpen}>
      <Icon name={iconName} size={16} />
    </StyledCaretIconDiv>
  ) : null;

  // If no actions, render the section normally
  if (actions.length === 0)
    return (
      <StyledExpandableSectionDiv
        borderRadius={borderRadius}
        showBorder={showBorder}
        backgroundColor={backgroundColor}>
        <StyledHeaderDiv onClick={handleToggle} hoverBackgroundColor={hoverBackgroundColor}>
          <StyledTitleContainerDiv>
            {showTextBeforeIcon ? (
              <>
                {titleElement}
                {iconElement}
              </>
            ) : (
              <>
                {iconElement}
                {titleElement}
              </>
            )}
          </StyledTitleContainerDiv>
        </StyledHeaderDiv>
        <StyledContentDiv isOpen={isOpen} showContentBorder={showContentBorder} maxHeight={maxHeight}>
          {children}
        </StyledContentDiv>
      </StyledExpandableSectionDiv>
    );

  // Render actions based on groupActions setting
  const renderActions = () => {
    if (groupActions)
      // Group all actions into a dropdown menu
      return (
        <StyledActionsDiv $showOnHover={showActionsOnHover} onClick={(e) => e.stopPropagation()}>
          <ActionMenu layerRootId="expandable-actions-menu">
            {actions.map((action) => (
              <ActionMenuItem
                key={action.label}
                iconName={action.icon}
                onClick={() => {
                  handleActionClick(action);
                }}>
                {action.label}
              </ActionMenuItem>
            ))}
          </ActionMenu>
        </StyledActionsDiv>
      );

    // Show actions as individual icon buttons
    return (
      <StyledActionsDiv $showOnHover={showActionsOnHover} onClick={(e) => e.stopPropagation()}>
        {actions.map((action) => (
          <TooltipCoordinator
            key={action.label}
            renderTooltip={() => <Tooltip placement="top">{action.tooltip ?? action.label}</Tooltip>}>
            <Button
              type="icon"
              onClick={() => {
                handleActionClick(action);
              }}>
              {action.icon && <Icon name={action.icon} />}
            </Button>
          </TooltipCoordinator>
        ))}
      </StyledActionsDiv>
    );
  };

  return (
    <StyledExpandableSectionDiv
      borderRadius={borderRadius}
      showBorder={showBorder}
      backgroundColor={backgroundColor}>
      <StyledHeaderDiv onClick={handleToggle} hoverBackgroundColor={hoverBackgroundColor}>
        <StyledTitleContainerDiv>
          {showTextBeforeIcon ? (
            <>
              {titleElement}
              {iconElement}
            </>
          ) : (
            <>
              {iconElement}
              {titleElement}
            </>
          )}
        </StyledTitleContainerDiv>
        {renderActions()}
      </StyledHeaderDiv>
      <StyledContentDiv isOpen={isOpen} showContentBorder={showContentBorder} maxHeight={maxHeight}>
        {children}
      </StyledContentDiv>
    </StyledExpandableSectionDiv>
  );
};

ExpandableSection.displayName = 'ExpandableSection';
