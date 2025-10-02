import React, {createContext, useCallback, useContext, useMemo, useRef, useState} from 'react';

import {
  DEFAULT_NESTED_CONFIG,
  NestedDropdownConfig,
  NestedDropdownContextValue,
  SubmenuState
} from '../types/nestedDropdown';

/**
 * React Context for managing nested dropdown state across the component tree.
 * Provides centralized state management for all submenus, including their open/close state,
 * hover state, nesting levels, and timeout management.
 */
export const NestedDropdownContext = createContext<NestedDropdownContextValue | null>(null);

/**
 * Props for the NestedDropdownProvider component.
 */
interface NestedDropdownProviderProps {
  /** Child components that will have access to the nested dropdown context */
  children: React.ReactNode;
  /** Configuration options for nested dropdown behavior. Will be merged with defaults */
  config?: Partial<NestedDropdownConfig>;
}

/**
 * Provider component that manages the state for all nested dropdowns within its tree.
 * 
 * This component provides:
 * - Centralized state management for all submenus
 * - Timeout management for hover delays
 * - Level-based z-index calculation
 * - Automatic cleanup of child submenus when parents close
 * 
 * @example
 * ```tsx
 * <NestedDropdownProvider config={{ openDelay: 200, closeDelay: 500 }}>
 *   <DropdownCoordinator>
 *     <DropdownItem submenu={<Dropdown>...</Dropdown>}>
 *       Parent Item
 *     </DropdownItem>
 *   </DropdownCoordinator>
 * </NestedDropdownProvider>
 * ```
 */
export const NestedDropdownProvider: React.FC<NestedDropdownProviderProps> = ({
  children,
  config: userConfig = {}
}) => {
  const [submenus, setSubmenus] = useState<Map<string, SubmenuState>>(new Map());
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  
  const config = useMemo(
    () => ({...DEFAULT_NESTED_CONFIG, ...userConfig}),
    [userConfig]
  );

  /**
   * Clears any pending timeout for a specific submenu.
   * Used to cancel delayed open/close operations when user interaction changes.
   * 
   * @param id - The unique identifier of the submenu
   */
  const clearTimeout = useCallback((id: string) => {
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      global.clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
  }, []);

  /**
   * Opens a submenu and manages the hierarchical state.
   * 
   * This function:
   * - Calculates the nesting level based on the parent
   * - Enforces maximum depth limits
   * - Closes conflicting submenus at the same level or deeper
   * - Sets up the submenu state with proper hierarchy
   * 
   * @param id - Unique identifier for the submenu to open
   * @param parentId - Optional parent submenu ID for hierarchy calculation
   */
  const openSubmenu = useCallback((id: string, parentId?: string) => {
    clearTimeout(id);
    
    setSubmenus(prev => {
      const newSubmenus = new Map(prev);
      const level = parentId ? (prev.get(parentId)?.level ?? 0) + 1 : 0;
      
      // Check max depth
      if (level >= config.maxDepth) {
        // eslint-disable-next-line no-console
        console.warn(`Maximum nesting depth exceeded for submenu ${id}`);
        return prev;
      }
      
      // Close any existing submenus at this level or deeper
      newSubmenus.forEach((submenu, submenuId) => {
        if (submenu.level >= level && submenuId !== id) 
          newSubmenus.delete(submenuId);
        
      });
      
      newSubmenus.set(id, {
        isOpen: true,
        isHovered: false,
        id,
        level,
        parentId
      });
      
      return newSubmenus;
    });
  }, [config.maxDepth, clearTimeout]);

  /**
   * Closes a submenu after a configured delay, unless it's being hovered.
   * 
   * This function:
   * - Respects the closeDelay configuration for smooth UX
   * - Only closes if the submenu is not currently hovered
   * - Automatically closes all child submenus when a parent closes
   * - Manages timeout cleanup to prevent memory leaks
   * 
   * @param id - Unique identifier for the submenu to close
   */
  const closeSubmenu = useCallback((id: string) => {
    clearTimeout(id);
    
    const timeout = global.setTimeout(() => {
      setSubmenus(prev => {
        const newSubmenus = new Map(prev);
        const submenu = newSubmenus.get(id);
        
        if (submenu && !submenu.isHovered) {
          // Close this submenu and all its children
          newSubmenus.forEach((childSubmenu, childId) => {
            if (childSubmenu.level > submenu.level) 
              newSubmenus.delete(childId);
            
          });
          newSubmenus.delete(id);
        }
        
        return newSubmenus;
      });
    }, config.closeDelay);
    
    timeoutsRef.current.set(id, timeout);
  }, [config.closeDelay, clearTimeout]);

  /**
   * Immediately closes all submenus at or deeper than the specified level.
   * Used for cleanup when a parent submenu closes or when resetting state.
   * 
   * @param level - The minimum nesting level to close (inclusive)
   */
  const closeSubmenusFromLevel = useCallback((level: number) => {
    setSubmenus(prev => {
      const newSubmenus = new Map(prev);
      newSubmenus.forEach((submenu, id) => {
        if (submenu.level >= level) {
          clearTimeout(id);
          newSubmenus.delete(id);
        }
      });
      return newSubmenus;
    });
  }, [clearTimeout]);

  /**
   * Updates the hover state of a submenu and manages associated timeouts.
   * 
   * When hovering starts:
   * - Cancels any pending close timeout
   * - Updates the hover state to prevent automatic closing
   * 
   * When hovering ends:
   * - Initiates the close sequence with delay
   * 
   * @param id - Unique identifier for the submenu
   * @param isHovered - Whether the submenu is currently being hovered
   */
  const setSubmenuHover = useCallback((id: string, isHovered: boolean) => {
    setSubmenus(prev => {
      const newSubmenus = new Map(prev);
      const submenu = newSubmenus.get(id);
      
      if (submenu) newSubmenus.set(id, {...submenu, isHovered});
      
      return newSubmenus;
    });
    
    if (isHovered) clearTimeout(id);
    else closeSubmenu(id);
  }, [clearTimeout, closeSubmenu]);

  /**
   * Gets the nesting level of a specific submenu.
   * 
   * @param id - Unique identifier for the submenu
   * @returns The nesting level (0 for top-level, 1 for first nested, etc.)
   */
  const getSubmenuLevel = useCallback((id: string): number => submenus.get(id)?.level ?? 0, [submenus]);

  /**
   * Checks if a new submenu can be opened based on maximum depth constraints.
   * 
   * @param parentId - Optional parent submenu ID
   * @returns True if the submenu can be opened without exceeding maxDepth
   */
  const canOpenSubmenu = useCallback((parentId?: string): boolean => {
    const parentLevel = parentId ? getSubmenuLevel(parentId) : -1;
    return parentLevel + 1 < config.maxDepth;
  }, [config.maxDepth, getSubmenuLevel]);

  const contextValue = useMemo<NestedDropdownContextValue>(() => ({
    config,
    submenus,
    openSubmenu,
    closeSubmenu,
    closeSubmenusFromLevel,
    setSubmenuHover,
    getSubmenuLevel,
    canOpenSubmenu
  }), [
    config,
    submenus,
    openSubmenu,
    closeSubmenu,
    closeSubmenusFromLevel,
    setSubmenuHover,
    getSubmenuLevel,
    canOpenSubmenu
  ]);

  // Cleanup timeouts on unmount
  React.useEffect(() => () => {
      timeoutsRef.current.forEach(timeout => global.clearTimeout(timeout));
      timeoutsRef.current.clear();
    }, []);

  return (
    <NestedDropdownContext.Provider value={contextValue}>
      {children}
    </NestedDropdownContext.Provider>
  );
};

/**
 * Hook to access the nested dropdown context.
 * Must be used within a NestedDropdownProvider.
 * 
 * @returns The nested dropdown context value with all state and methods
 * @throws Error if used outside of a NestedDropdownProvider
 * 
 * @example
 * ```tsx
 * const { openSubmenu, closeSubmenu, config } = useNestedDropdown();
 * ```
 */
export const useNestedDropdown = (): NestedDropdownContextValue => {
  const context = useContext(NestedDropdownContext);
  if (!context) 
    throw new Error('useNestedDropdown must be used within a NestedDropdownProvider');
  
  return context;
};

/**
 * Hook for managing a specific submenu's state and interactions.
 * Provides a convenient interface for individual submenu components.
 * 
 * @param id - Unique identifier for the submenu
 * @returns Object containing submenu state and control methods
 * 
 * @example
 * ```tsx
 * const { isOpen, open, close, setHover, canOpen } = useSubmenu('my-submenu-id');
 * 
 * // Open the submenu with a parent context
 * const handleMouseEnter = () => {
 *   if (canOpen(parentId)) {
 *     open(parentId);
 *   }
 * };
 * 
 * // Update hover state
 * const handleMouseLeave = () => setHover(false);
 * ```
 */
export const useSubmenu = (id: string) => {
  const {
    submenus,
    openSubmenu,
    closeSubmenu,
    setSubmenuHover,
    canOpenSubmenu
  } = useNestedDropdown();
  
  const submenuState = submenus.get(id);
  
  const open = useCallback((parentId?: string) => openSubmenu(id, parentId), [openSubmenu, id]);
  const close = useCallback(() => closeSubmenu(id), [closeSubmenu, id]);
  const setHover = useCallback((isHovered: boolean) => setSubmenuHover(id, isHovered), [setSubmenuHover, id]);
  const canOpen = useCallback((parentId?: string) => canOpenSubmenu(parentId), [canOpenSubmenu]);
  
  return {
    /** Whether the submenu is currently open */
    isOpen: submenuState?.isOpen ?? false,
    /** Whether the submenu is currently being hovered */
    isHovered: submenuState?.isHovered ?? false,
    /** The nesting level of this submenu (0 = top level) */
    level: submenuState?.level ?? 0,
    /** Function to open this submenu */
    open,
    /** Function to close this submenu */
    close,
    /** Function to update hover state */
    setHover,
    /** Function to check if submenu can be opened */
    canOpen
  };
};

