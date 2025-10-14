import React, {useCallback, useLayoutEffect, useRef} from 'react';
import styled from 'styled-components';

import {useNavigationalDropdown} from '../context/NavigationalDropdownContext';

interface NavigationalSubmenuTriggerProps {
  children: React.ReactNode;
  submenuId: string;
  getSubmenu: () => React.ReactNode;
  backTitle?: string;
  disabled?: boolean;
  className?: string;
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

const isInteractiveElement = (target: HTMLElement): boolean =>
  Boolean(
    target.closest(
      'input:not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]'
    )
  );

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

  useLayoutEffect(() => {
    if (autoNavigateToSubmenuId === submenuId && !hasAutoNavigatedRef.current) {
      hasAutoNavigatedRef.current = true;
      navigateTo(submenuId, getSubmenu, backTitle);
    }

    if (autoNavigateToSubmenuId !== submenuId) hasAutoNavigatedRef.current = false;
  }, [autoNavigateToSubmenuId, submenuId, getSubmenu, backTitle, navigateTo]);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) return;

      const {target} = event;
      if (target instanceof HTMLElement && isInteractiveElement(target)) return;

      event.preventDefault();
      event.stopPropagation();

      navigateTo(submenuId, getSubmenu, backTitle);
      onNavigate?.(submenuId);
    },
    [disabled, submenuId, getSubmenu, backTitle, navigateTo, onNavigate]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled) return;

      const {target} = event;
      if (target instanceof HTMLElement && isInteractiveElement(target)) return;

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
