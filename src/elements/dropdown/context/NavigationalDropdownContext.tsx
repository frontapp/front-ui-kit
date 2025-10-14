import React, {createContext, useCallback, useContext, useMemo, useState, useLayoutEffect} from 'react';

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
  const [autoNavigateToSubmenuId, setAutoNavigateToSubmenuId] = React.useState<string | null>(null);

  useLayoutEffect(() => {
    if (prevContentVersionRef.current !== contentVersion && prevContentVersionRef.current !== undefined) {
      setViewStack((currentStack) => {
        const activeSubmenuId = currentStack.length > 1 ? currentStack[currentStack.length - 1].id : null;

        const newStack = [
          {
            id: rootId,
            getContent: getRootContent,
            level: 0
          }
        ];

        if (activeSubmenuId && activeSubmenuId !== rootId) {
          setAutoNavigateToSubmenuId(activeSubmenuId);
        }

        return newStack;
      });
    }
    prevContentVersionRef.current = contentVersion;
  }, [contentVersion, getRootContent, rootId]);

  const navigateTo = useCallback(
    (id: string, getContent: () => React.ReactNode, parentTitle?: string) => {
      setAutoNavigateToSubmenuId(null);

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
    [viewStack, contentVersion]
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
      autoNavigateToSubmenuId
    }),
    [
      viewStack,
      currentContent,
      navigateTo,
      navigateBack,
      canNavigateBack,
      reset,
      getCurrentLevel,
      autoNavigateToSubmenuId
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
