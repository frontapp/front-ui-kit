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
  const [autoNavigateToSubmenuPath, setAutoNavigateToSubmenuPath] = React.useState<string[]>([]);

  useLayoutEffect(() => {
    if (prevContentVersionRef.current !== contentVersion && prevContentVersionRef.current !== undefined)
      setViewStack((currentStack) => {
        // Store the entire navigation path, not just the last submenu ID
        const navigationPath = currentStack.length > 1 ? currentStack.slice(1).map((view) => view.id) : [];

        const newStack = [
          {
            id: rootId,
            getContent: getRootContent,
            level: 0
          }
        ];

        // Set the navigation path to auto-restore
        if (navigationPath.length > 0) setAutoNavigateToSubmenuPath(navigationPath);

        return newStack;
      });

    prevContentVersionRef.current = contentVersion;
  }, [contentVersion, getRootContent, rootId]);

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
