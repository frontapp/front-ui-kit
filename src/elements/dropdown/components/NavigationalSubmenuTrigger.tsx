import React, {useCallback, useLayoutEffect, useRef} from 'react';
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
 * Check if the event target is an interactive element that should not trigger navigation
 */
const isInteractiveElement = (target: HTMLElement): boolean => {
  // Check if the target or any parent is an input, checkbox, or other interactive element
  return Boolean(
    target.closest(
      'input:not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]'
    )
  );
};

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
  const {navigateTo, autoNavigateToSubmenuId} = useNavigationalDropdown();
  const hasAutoNavigatedRef = useRef(false);

  // Auto-navigate to this submenu if it matches the autoNavigateToSubmenuId
  // This happens after a content refresh to restore the previous navigation state
  // Using useLayoutEffect to make this synchronous and minimize flicker
  useLayoutEffect(() => {
    if (autoNavigateToSubmenuId === submenuId && !hasAutoNavigatedRef.current) {
      hasAutoNavigatedRef.current = true;
      // Use the fresh getSubmenu function from current render
      navigateTo(submenuId, getSubmenu, backTitle);
    }

    // Reset the flag when autoNavigateToSubmenuId changes away from this submenu
    if (autoNavigateToSubmenuId !== submenuId) {
      hasAutoNavigatedRef.current = false;
    }
  }, [autoNavigateToSubmenuId, submenuId, getSubmenu, backTitle, navigateTo]);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) return;

      // Check if the click target is an interactive element (input, textarea, etc.)
      const target = event.target as HTMLElement;
      if (isInteractiveElement(target)) {
        // Don't interfere with interactive elements
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

      // Check if the focus is on an interactive element
      const target = event.target as HTMLElement;
      if (isInteractiveElement(target)) {
        // Don't interfere with interactive elements
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
