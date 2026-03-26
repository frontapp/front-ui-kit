import React, {createContext, useCallback, useContext, useLayoutEffect, useMemo, useState} from 'react';

export interface NavigationalView {
  id: string;
  getContent: () => React.ReactNode;
  parentTitle?: string;
  level: number;
}

export interface NavigationalDropdownContextValue {
  viewStack: NavigationalView[];
  currentContent: React.ReactNode;
  navigateTo: (id: string, getContent: () => React.ReactNode, parentTitle?: string) => void;
  navigateBack: () => void;
  canNavigateBack: boolean;
  reset: () => void;
  getCurrentLevel: () => number;
  autoNavigateToSubmenuId: string | null;
  autoNavigateToSubmenuPath: string[];
  // Add back navigation handler
  backNavigation: {
    canNavigateBack: boolean;
    navigateBack: (event: React.MouseEvent) => void;
  };
}

export const NavigationalDropdownContext = createContext<NavigationalDropdownContextValue | null>(null);

interface NavigationalDropdownProviderProps {
  children: React.ReactNode;
  getRootContent: () => React.ReactNode;
  rootId?: string;
  onNavigate?: (level: number, viewId: string) => void;
  onNavigateBack?: (level: number, viewId: string) => void;
  contentVersion?: number;
}

export const NavigationalDropdownProvider: React.FC<NavigationalDropdownProviderProps> = ({
  children,
  getRootContent,
  rootId = 'root',
  onNavigate,
  onNavigateBack,
  contentVersion = 0
}) => {
  const [viewStack, setViewStack] = useState<NavigationalView[]>([
    {
      id: rootId,
      getContent: getRootContent,
      level: 0
    }
  ]);

  const prevContentVersionRef = React.useRef(contentVersion);
  const viewStackRef = React.useRef(viewStack);
  viewStackRef.current = viewStack;
  const [autoNavigateToSubmenuPath, setAutoNavigateToSubmenuPath] = React.useState<string[]>([]);

  // Reset stack when content changes, then restore submenu path via autoNavigateToSubmenuPath.
  // Capture the path from viewStackRef during this effect (after the render where contentVersion
  // changed) instead of reading stack inside setViewStack — avoids nested setState and keeps
  // stack + path updates batching consistently.
  useLayoutEffect(() => {
    const prevVersion = prevContentVersionRef.current;
    if (prevVersion !== contentVersion && prevVersion !== undefined) {
      const navigationPath =
        viewStackRef.current.length > 1 ? viewStackRef.current.slice(1).map((view) => view.id) : [];

      setViewStack([
        {
          id: rootId,
          getContent: getRootContent,
          level: 0
        }
      ]);

      if (navigationPath.length > 0) setAutoNavigateToSubmenuPath(navigationPath);
    }

    prevContentVersionRef.current = contentVersion;
  }, [contentVersion, getRootContent, rootId]);

  const navigateTo = useCallback(
    (id: string, getContent: () => React.ReactNode, parentTitle?: string) => {
      setViewStack((prev) => {
        const top = prev[prev.length - 1];
        // Idempotent: same view already on top (fresh getContent / avoids duplicate stack entries).
        if (top && top.id === id) {
          const updatedView: NavigationalView = {
            id,
            getContent,
            parentTitle,
            level: top.level
          };
          onNavigate?.(updatedView.level, id);
          return [...prev.slice(0, -1), updatedView];
        }

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

      // Remove the first item from the auto-navigation path after navigating to it
      setAutoNavigateToSubmenuPath((prev) => {
        if (prev.length > 0 && prev[0] === id) return prev.slice(1);

        // If user is manually navigating (not auto), clear the path
        return [];
      });
    },
    [onNavigate]
  );

  const navigateBack = useCallback(() => {
    setViewStack((prev) => {
      if (prev.length <= 1) return prev;

      const newStack = prev.slice(0, -1);
      const currentView = newStack[newStack.length - 1];

      onNavigateBack?.(currentView.level, currentView.id);
      return newStack;
    });
  }, [onNavigateBack]);

  const reset = useCallback(() => {
    setViewStack((prev) => (prev.length > 1 ? [prev[0]] : prev));
  }, []);

  const getCurrentLevel = useCallback(
    () => (viewStack.length > 0 ? viewStack[viewStack.length - 1].level : 0),
    [viewStack]
  );

  const canNavigateBack = viewStack.length > 1;

  const currentContent = useMemo(
    () => (viewStack.length > 0 ? viewStack[viewStack.length - 1].getContent() : null),
    [viewStack]
  );

  const contextValue = useMemo<NavigationalDropdownContextValue>(
    () => ({
      viewStack,
      currentContent,
      navigateTo,
      navigateBack,
      canNavigateBack,
      reset,
      getCurrentLevel,
      autoNavigateToSubmenuId: autoNavigateToSubmenuPath.length > 0 ? autoNavigateToSubmenuPath[0] : null,
      autoNavigateToSubmenuPath,
      // Add back navigation handler
      backNavigation: {
        canNavigateBack,
        navigateBack: (event: React.MouseEvent) => {
          event.preventDefault();
          event.stopPropagation();
          navigateBack();
        }
      }
    }),
    [
      viewStack,
      currentContent,
      navigateTo,
      navigateBack,
      canNavigateBack,
      reset,
      getCurrentLevel,
      autoNavigateToSubmenuPath
    ]
  );

  return (
    <NavigationalDropdownContext.Provider value={contextValue}>
      {children}
    </NavigationalDropdownContext.Provider>
  );
};

export const useNavigationalDropdown = (): NavigationalDropdownContextValue => {
  const context = useContext(NavigationalDropdownContext);
  if (!context) throw new Error('useNavigationalDropdown must be used within a NavigationalDropdownProvider');

  return context;
};

export const useNavigationalDropdownSafe = (): NavigationalDropdownContextValue | null => {
  const context = useContext(NavigationalDropdownContext);
  return context || null;
};
