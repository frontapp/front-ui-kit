import {type Placement} from '@popperjs/core';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {usePopper} from 'react-popper';
import { styled } from 'styled-components';

import {Layer} from '../../../components/layer/layer';
import {useNestedDropdown, useSubmenu} from '../context/NestedDropdownContext';
import {useSubmenuPositioning} from '../hooks/useSubmenuPositioning';
import {SubmenuCapableProps} from '../types/nestedDropdown';

interface SubmenuTriggerProps extends SubmenuCapableProps {
  children: React.ReactNode;
  /** Parent submenu ID for nesting */
  parentSubmenuId?: string;
  /** Custom class name */
  className?: string;
  /** Whether this trigger is disabled */
  disabled?: boolean;
}

const StyledSubmenuTriggerDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
  
  /* Ensure proper cursor and interaction states */
  cursor: pointer;
  
  /* Maintain consistent styling with dropdown items */
  &:hover {
    /* Let the child dropdown item handle hover styles */
  }
  
  /* Ensure submenu trigger takes full space of dropdown item */
  & > * {
    flex: 1;
  }
`;

const StyledSubmenuContentWrapper = styled.div`
  /* Wrapper for submenu content to ensure proper event handling */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
`;

/**
 * SubmenuTrigger component handles the display and positioning of dropdown submenus.
 * 
 * This component wraps dropdown items that have submenus and manages:
 * - Hover state for opening/closing submenus
 * - Custom Popper.js positioning that bypasses PopoverContext
 * - Mouse event handling for smooth submenu interactions
 * 
 * The positioning implementation uses direct Popper.js integration instead of 
 * PopoverContext to avoid conflicts with the main dropdown's context and ensure
 * precise positioning relative to individual dropdown items.
 */
export const SubmenuTrigger: React.FC<SubmenuTriggerProps> = ({
  children,
  submenuId,
  submenu,
  parentSubmenuId,
  className,
  disabled = false,
  onSubmenuOpen,
  onSubmenuClose,
  submenuConfig
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const {config} = useNestedDropdown();
  const effectiveConfig = {...config, ...submenuConfig};
  
  // Generate a deterministic ID if none provided (must be called unconditionally)
  const generatedId = React.useId();
  const effectiveSubmenuId = submenuId ?? `submenu-${generatedId}`;
  
  const {
    isOpen,
    level,
    open,
    close,
    setHover,
    canOpen
  } = useSubmenu(effectiveSubmenuId);
  
  
  const {getPositioning} = useSubmenuPositioning({
    submenuId: effectiveSubmenuId,
    level,
    placement: effectiveConfig.placement,
    layerIdPrefix: effectiveConfig.layerIdPrefix
  });
  

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (disabled || !submenu || !canOpen(parentSubmenuId)) return;
    
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Set hover to true immediately to prevent closing
    setHover(true);
    
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        open(parentSubmenuId);
        onSubmenuOpen?.(effectiveSubmenuId);
      }
    }, effectiveConfig.openDelay);
  }, [disabled, submenu, canOpen, parentSubmenuId, open, onSubmenuOpen, effectiveSubmenuId, effectiveConfig.openDelay, setHover]);

  const handleMouseLeave = useCallback(() => {
    if (disabled || !submenu) return;
    
    
    // Clear any pending open timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Always set hover to false when leaving trigger
    // The submenu mouse enter will set it back to true if mouse moves to submenu
    setHover(false);
  }, [disabled, submenu, setHover]);

  const handleSubmenuMouseEnter = useCallback(() => {
    if (disabled) return;
    setHover(true);
  }, [disabled, setHover]);

  const handleSubmenuMouseLeave = useCallback(() => {
    if (disabled) return;
    setHover(false);
    // Call onSubmenuClose when submenu is closed via mouse leave
    onSubmenuClose?.(effectiveSubmenuId);
  }, [disabled, setHover, onSubmenuClose, effectiveSubmenuId]);

  // Cleanup on unmount and call onSubmenuClose when closing
  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    close();
    onSubmenuClose?.(effectiveSubmenuId);
  }, [close, onSubmenuClose, effectiveSubmenuId]);

  // Use the individual trigger item as anchor element for positioning
  const getAnchorElement = useCallback(() => {
    if (!triggerRef.current) return null;
    
    // Ensure we're using the actual dropdown item element, not any parent containers
    const itemElement = triggerRef.current.closest('[role="menuitem"]') || triggerRef.current;
    return itemElement instanceof HTMLElement ? itemElement : triggerRef.current;
  }, []);

  const anchorElement = getAnchorElement();
  const positioning = anchorElement ? getPositioning(anchorElement) : null;
  

  return (
    <>
      <StyledSubmenuTriggerDiv
        ref={triggerRef}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role={submenu ? 'menuitem' : undefined}
        aria-haspopup={submenu ? 'menu' : undefined}
        aria-expanded={submenu ? isOpen : undefined}
        data-submenu-trigger={submenu ? 'true' : undefined}
        data-submenu-level={level}
        data-submenu-id={effectiveSubmenuId}>
        {children}
      </StyledSubmenuTriggerDiv>
      
      
      {isOpen && submenu && positioning && (
        <SubmenuPortal
          positioning={positioning}
          onMouseEnter={handleSubmenuMouseEnter}
          onMouseLeave={handleSubmenuMouseLeave}
          submenuId={effectiveSubmenuId}
          triggerElement={triggerRef.current}>
          <StyledSubmenuContentWrapper
            onMouseEnter={handleSubmenuMouseEnter}
            onMouseLeave={handleSubmenuMouseLeave}>
            {submenu}
          </StyledSubmenuContentWrapper>
        </SubmenuPortal>
      )}
    </>
  );
};

// Separate component for the portal to avoid re-renders
/**
 * Props for the SubmenuPortal component
 */
interface SubmenuPortalProps {
  positioning: {
    anchorElement: HTMLElement;
    placement: Placement;
    zIndex: number;
    layerId: string;
  };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  submenuId: string;
  triggerElement: HTMLElement | null;
  children: React.ReactNode;
}

/**
 * SubmenuPortal renders the submenu in a portal with custom Popper.js positioning.
 * 
 * This component bypasses the PopoverContext system to avoid conflicts with the
 * main dropdown's positioning context. It uses direct Popper.js integration to
 * position the submenu relative to the specific trigger element.
 */
const SubmenuPortal: React.FC<SubmenuPortalProps> = ({
  positioning,
  onMouseEnter,
  onMouseLeave,
  submenuId,
  triggerElement,
  children
}) => {
  /**
   * Custom Popper.js implementation for submenu positioning.
   * 
   * We bypass the PopoverContext system here because:
   * 1. The main dropdown already has a PopoverContext that anchors to the dropdown coordinator
   * 2. We need to anchor specifically to the individual dropdown item, not the coordinator
   * 3. This avoids context conflicts and gives us precise control over submenu positioning
   */

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  
  // Direct Popper.js usage with the specific trigger element as anchor
  const { styles, attributes } = usePopper(triggerElement, popperElement, {
    placement: positioning.placement,
    modifiers: [
      {
        name: 'computeStyles',
        options: {
          gpuAcceleration: false
        }
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8] // 8px gap between trigger and submenu
        }
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 10,
          boundary: window.document.body
        }
      }
    ]
  });

  return (
    <Layer layerRootId={positioning.layerId}>
      <div
        ref={setPopperElement}
        style={styles.popper}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...attributes.popper}>
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          data-submenu-portal={submenuId}
          role="menu"
          tabIndex={-1}
          aria-labelledby={`trigger-${submenuId}`}
          style={{ 
            zIndex: positioning.zIndex,
            pointerEvents: 'auto',
            width: 'auto',
            minWidth: '200px',
            maxWidth: '400px'
          }}>
          {children}
        </div>
      </div>
    </Layer>
  );
};

