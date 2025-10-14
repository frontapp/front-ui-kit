import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';

/**
 * Represents a single view/level in the navigation stack
 */
export interface NavigationalView {
  /** Unique identifier for this view */
  id: string;
  /** Function that returns the content to render for this view */
  getContent: () => React.ReactNode;
  /** Title to show in the back button */
  parentTitle?: string;
  /** Level in the navigation hierarchy (0 = root) */
  level: number;
}

/**
 * Context value for navigational dropdown state management
 */
export interface NavigationalDropdownContextValue {
  /** Current navigation stack */
  viewStack: NavigationalView[];
  /** The currently active view's content */
  currentContent: React.ReactNode;
  /** Navigate to a new view (push onto stack) */
  navigateTo: (id: string, getContent: () => React.ReactNode, parentTitle?: string) => void;
  /** Navigate back to parent view (pop from stack) */
  navigateBack: () => void;
  /** Check if we can navigate back */
  canNavigateBack: boolean;
  /** Reset to root view */
  reset: () => void;
  /** Get the current navigation level */
  getCurrentLevel: () => number;
}

/**
 * React Context for managing navigational dropdown state
 */
export const NavigationalDropdownContext = createContext<NavigationalDropdownContextValue | null>(null);

/**
 * Props for the NavigationalDropdownProvider component
 */
interface NavigationalDropdownProviderProps {
  /** Child components that will have access to the navigational dropdown context */
  children: React.ReactNode;
  /** Function that returns root content */
  getRootContent: () => React.ReactNode;
  /** Optional root view ID */
  rootId?: string;
  /** Callback when navigation occurs */
  onNavigate?: (level: number, viewId: string) => void;
  /** Callback when navigating back */
  onNavigateBack?: (level: number, viewId: string) => void;
}

/**
 * Provider component that manages navigational dropdown state using a stack-based approach.
 */
export const NavigationalDropdownProvider: React.FC<NavigationalDropdownProviderProps> = ({
  children,
  getRootContent,
  rootId = 'root',
  onNavigate,
  onNavigateBack
}) => {
  // Initialize with root view
  const [viewStack, setViewStack] = useState<NavigationalView[]>([
    {
      id: rootId,
      getContent: getRootContent,
      level: 0
    }
  ]);

  /**
   * Navigate to a new view by pushing it onto the stack
   */
  const navigateTo = useCallback(
    (id: string, getContent: () => React.ReactNode, parentTitle?: string) => {
      setViewStack((prev) => {
        const currentLevel = prev.length > 0 ? prev[prev.length - 1].level : -1;
        const newView: NavigationalView = {
          id,
          getContent,
          parentTitle,
          level: currentLevel + 1
        };

        const newStack = [...prev, newView];
        onNavigate?.(newView.level, id);
        return newStack;
      });
    },
    [onNavigate]
  );

  /**
   * Navigate back by popping the current view from the stack
   */
  const navigateBack = useCallback(() => {
    setViewStack((prev) => {
      if (prev.length <= 1) return prev; // Don't pop the root view

      const newStack = prev.slice(0, -1);
      const currentView = newStack[newStack.length - 1];
      onNavigateBack?.(currentView.level, currentView.id);
      return newStack;
    });
  }, [onNavigateBack]);

  /**
   * Reset to the root view
   */
  const reset = useCallback(() => {
    setViewStack((prev) => (prev.length > 1 ? [prev[0]] : prev));
  }, []);

  /**
   * Get the current navigation level
   */
  const getCurrentLevel = useCallback(
    () => (viewStack.length > 0 ? viewStack[viewStack.length - 1].level : 0),
    [viewStack]
  );

  const canNavigateBack = viewStack.length > 1;

  // Get fresh content from the current view
  const currentContent = viewStack.length > 0 ? viewStack[viewStack.length - 1].getContent() : null;

  const contextValue = useMemo<NavigationalDropdownContextValue>(
    () => ({
      viewStack,
      currentContent,
      navigateTo,
      navigateBack,
      canNavigateBack,
      reset,
      getCurrentLevel
    }),
    [viewStack, currentContent, navigateTo, navigateBack, canNavigateBack, reset, getCurrentLevel]
  );

  return (
    <NavigationalDropdownContext.Provider value={contextValue}>
      {children}
    </NavigationalDropdownContext.Provider>
  );
};

/**
 * Hook to access the navigational dropdown context.
 */
export const useNavigationalDropdown = (): NavigationalDropdownContextValue => {
  const context = useContext(NavigationalDropdownContext);
  if (!context) throw new Error('useNavigationalDropdown must be used within a NavigationalDropdownProvider');

  return context;
};
