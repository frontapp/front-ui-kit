import React, {createContext, useCallback, useContext, useLayoutEffect, useMemo, useState} from 'react';

export interface NavigationalView {
  id: string;
  getContent: () => React.ReactNode;
  parentTitle?: string;
  level: number;
}

interface NavigationState {
  viewStack: NavigationalView[];
  autoNavigateToSubmenuPath: string[];
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
  const [navState, setNavState] = useState<NavigationState>(() => ({
    viewStack: [
      {
        id: rootId,
        getContent: getRootContent,
        level: 0
      }
    ],
    autoNavigateToSubmenuPath: []
  }));

  const {viewStack, autoNavigateToSubmenuPath} = navState;

  const prevContentVersionRef = React.useRef(contentVersion);

  useLayoutEffect(() => {
    if (prevContentVersionRef.current !== contentVersion && prevContentVersionRef.current !== undefined) {
      setNavState((prev) => {
        const navigationPath =
          prev.viewStack.length > 1 ? prev.viewStack.slice(1).map((view) => view.id) : [];

        return {
          viewStack: [
            {
              id: rootId,
              getContent: getRootContent,
              level: 0
            }
          ],
          autoNavigateToSubmenuPath: navigationPath.length > 0 ? navigationPath : []
        };
      });
    }

    prevContentVersionRef.current = contentVersion;
  }, [contentVersion, getRootContent, rootId]);

  const navigateTo = useCallback(
    (id: string, getContent: () => React.ReactNode, parentTitle?: string) => {
      setNavState((prev) => {
        const prevStack = prev.viewStack;
        const top = prevStack[prevStack.length - 1];

        const nextPath =
          prev.autoNavigateToSubmenuPath.length > 0 && prev.autoNavigateToSubmenuPath[0] === id
            ? prev.autoNavigateToSubmenuPath.slice(1)
            : [];

        // Idempotent navigation: opening the view that is already on top refreshes its props
        // (getContent / parentTitle) without growing the stack. This matches "go to route X" when
        // already on X, and covers batched auto-restore or repeated navigateTo calls before paint.
        if (top && top.id === id) {
          const updatedView: NavigationalView = {
            id,
            getContent,
            parentTitle,
            level: top.level
          };
          onNavigate?.(updatedView.level, id);
          return {
            viewStack: [...prevStack.slice(0, -1), updatedView],
            autoNavigateToSubmenuPath: nextPath
          };
        }

        const currentLevel = prevStack.length > 0 ? prevStack[prevStack.length - 1].level : -1;
        const newView: NavigationalView = {
          id,
          getContent,
          parentTitle,
          level: currentLevel + 1
        };

        onNavigate?.(newView.level, id);
        return {
          viewStack: [...prevStack, newView],
          autoNavigateToSubmenuPath: nextPath
        };
      });
    },
    [onNavigate]
  );

  const navigateBack = useCallback(() => {
    setNavState((prev) => {
      if (prev.viewStack.length <= 1) return prev;

      const newStack = prev.viewStack.slice(0, -1);
      const currentView = newStack[newStack.length - 1];

      onNavigateBack?.(currentView.level, currentView.id);
      return {
        ...prev,
        viewStack: newStack
      };
    });
  }, [onNavigateBack]);

  const reset = useCallback(() => {
    setNavState((prev) => (prev.viewStack.length > 1 ? {...prev, viewStack: [prev.viewStack[0]]} : prev));
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
