import {FC, ReactNode} from 'react';
import styled from 'styled-components';

import {Icon, IconName} from '../../elements/icon/icon';
import {greys} from '../../helpers/colorHelpers';
import {VisualSizesEnum} from '../../helpers/fontHelpers';
import {makeSizeConstants} from '../../helpers/styleHelpers';
import {ActionMenu} from '../_pre-built/actionMenu/actionMenu';
import {ActionMenuItem} from '../_pre-built/actionMenu/actionMenuItem';
import {Button} from '../button/button';
import {Tooltip} from '../tooltip/tooltip';
import {TooltipCoordinator} from '../tooltip/tooltipCoordinator';
import {CardBody} from './cardBody';
import {CardFooter} from './cardFooter';
import {CardHeader} from './cardHeader';

/*
 * Props.
 */

export interface CardAction {
  /** The label for the action. */
  label: string;
  /** The icon name for the action. */
  icon?: IconName;
  /** The tooltip text for the action (optional, defaults to label). */
  tooltip?: string;
  /** Called when the action is clicked. */
  onClick: () => void;
}

export interface CardProps {
  /** Content to render inside the card. */
  children?: ReactNode;
  /** The size of the card. */
  size?: VisualSizesEnum;
  /** Class name to allow custom styling of the card. */
  className?: string;
  /** Optional actions to display in the top right corner. */
  actions?: CardAction[];
  /** Whether actions should only be visible on hover (default: true - actions always visible). */
  showActionsOnHover?: boolean;
  /** Whether to group actions into a dropdown menu (default: false - show as individual icon buttons). */
  groupActions?: boolean;
}

/*
 * Style.
 */

interface StyledCardProps {
  $size: VisualSizesEnum;
}

const cardPadding = makeSizeConstants(12, 16, 20);
const cardBorderRadius = makeSizeConstants(6, 8, 10);

const StyledCard = styled.div<StyledCardProps>`
  display: flex;
  flex-direction: column;
  background: ${greys.white};
  border-radius: ${(p) => cardBorderRadius[p.$size]}px;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;

  /* Padding based on size */
  padding: ${(p) => cardPadding[p.$size]}px;
`;

const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ActionButtonContainer = styled.div<{zIndex?: number; $showOnHover?: boolean}>`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: ${(p) => p.zIndex || 10};
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: ${(p) => (p.$showOnHover ? 0 : 1)};
  transition: opacity 0.2s ease;

  /* Show on parent hover (only if showOnHover is true) */
  ${(p) =>
    p.$showOnHover &&
    `${RelativeContainer}:hover & {
    opacity: 1;
  }`}
`;

/*
 * Component.
 */

const CardComponent: FC<CardProps> = ({
  children,
  size = VisualSizesEnum.MEDIUM,
  className,
  actions = [],
  showActionsOnHover = false,
  groupActions = false
}) => {
  const handleActionClick = (action: CardAction) => {
    action.onClick();
  };

  // Render actions based on groupActions setting
  const renderActions = () => {
    // Return null if no actions
    if (actions.length === 0) return null;

    if (groupActions)
      // Group all actions into a dropdown menu
      return (
        <ActionButtonContainer key="actions-menu" $showOnHover={showActionsOnHover}>
          <ActionMenu layerRootId="actions-menu">
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
        </ActionButtonContainer>
      );

    // Show actions as individual icon buttons
    return (
      <ActionButtonContainer key="individual-actions" $showOnHover={showActionsOnHover}>
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
      </ActionButtonContainer>
    );
  };

  return (
    <RelativeContainer className={className}>
      <StyledCard $size={size}>{children}</StyledCard>
      {renderActions()}
    </RelativeContainer>
  );
};

/*
 * Sub-components.
 */

// Create a compound component by assigning sub-components to the main component
const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter
}) as typeof CardComponent & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export {Card};
