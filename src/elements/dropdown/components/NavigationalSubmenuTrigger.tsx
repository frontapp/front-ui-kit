import React, {useCallback} from 'react';
import styled from 'styled-components';

import {useNavigationalDropdown} from '../context/NavigationalDropdownContext';

/**
 * Props for the NavigationalSubmenuTrigger component
 */
interface NavigationalSubmenuTriggerProps {
  /** The content to render as the trigger */
  children: React.ReactNode;
  /** Unique identifier for the submenu */
  submenuId: string;
  /** Function that returns the submenu content */
  getSubmenu: () => React.ReactNode;
  /** Title to show in the back button when navigating to this submenu */
  backTitle?: string;
  /** Whether this trigger is disabled */
  disabled?: boolean;
  /** Custom class name */
  className?: string;
  /** Callback when navigation occurs */
  onNavigate?: (submenuId: string) => void;
}

const StyledTriggerWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
  cursor: pointer;

  /* Ensure trigger takes full space */
  & > * {
    flex: 1;
  }
`;

/**
 * NavigationalSubmenuTrigger component handles click-to-navigate interactions for nested dropdowns.
 */
export const NavigationalSubmenuTrigger: React.FC<NavigationalSubmenuTriggerProps> = ({
  children,
  submenuId,
  getSubmenu,
  backTitle,
  disabled = false,
  className,
  onNavigate
}) => {
  const {navigateTo} = useNavigationalDropdown();

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) return;

      // Check if the click target is specifically an input field or checkbox
      const target = event.target as HTMLElement;
      const isInputOrCheckbox = target.closest(
        'input[type="text"], input[type="search"], input[type="email"], input[type="password"], input[type="url"], input[type="number"], [role="checkbox"]'
      );

      if (isInputOrCheckbox) {
        // Don't interfere with input fields or checkboxes
        return;
      }
      // Prevent the dropdown from closing
      event.preventDefault();
      event.stopPropagation();

      // Navigate to the submenu
      navigateTo(submenuId, getSubmenu, backTitle);
      onNavigate?.(submenuId);
    },
    [disabled, submenuId, getSubmenu, backTitle, navigateTo, onNavigate]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled) return;

      // Check if the focus is specifically on an input field or checkbox
      const target = event.target as HTMLElement;
      const isInputOrCheckbox = target.closest(
        'input[type="text"], input[type="search"], input[type="email"], input[type="password"], input[type="url"], input[type="number"], [role="checkbox"]'
      );

      if (isInputOrCheckbox) {
        // Don't interfere with input fields or checkboxes
        return;
      }

      // Handle Enter and Space key for accessibility
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
        navigateTo(submenuId, getSubmenu, backTitle);
        onNavigate?.(submenuId);
      }
    },
    [disabled, submenuId, getSubmenu, backTitle, navigateTo, onNavigate]
  );

  return (
    <StyledTriggerWrapper
      className={className}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-expanded={false}
      aria-haspopup="menu">
      {children}
    </StyledTriggerWrapper>
  );
};

NavigationalSubmenuTrigger.displayName = 'NavigationalSubmenuTrigger';
