import React, {useEffect, isValidElement, cloneElement, Children} from 'react';

import {useNavigationalDropdown} from '../context/NavigationalDropdownContext';

interface NavigationalDropdownContainerProps {
  className?: string;
}

const hasDisplayName = (element: React.ReactElement, name: string): boolean => {
  return Boolean(
    element.type &&
      typeof element.type === 'function' &&
      (element.type as {displayName?: string}).displayName === name
  );
};

const injectBackClickIntoDropdownHeader = (
  children: React.ReactNode,
  handleBackClick: (event: React.MouseEvent) => void
): React.ReactNode => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (hasDisplayName(child, 'DropdownHeader')) {
      return cloneElement(
        child as React.ReactElement,
        {
          onBackClick: handleBackClick
        } as never
      );
    }

    return child;
  });
};

export const NavigationalDropdownContainer: React.FC<NavigationalDropdownContainerProps> = ({className}) => {
  const {currentContent, navigateBack, canNavigateBack, reset} = useNavigationalDropdown();

  useEffect(() => {
    reset();
  }, [reset]);

  const handleBackClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    navigateBack();
  };

  if (!currentContent) return null;

  if (canNavigateBack && isValidElement(currentContent)) {
    const dropdownElement = currentContent;

    if (hasDisplayName(dropdownElement, 'Dropdown')) {
      const props = dropdownElement.props as {children?: React.ReactNode; className?: string};

      if (props.children) {
        const modifiedChildren = injectBackClickIntoDropdownHeader(props.children, handleBackClick);

        return cloneElement(dropdownElement, {
          ...props,
          children: modifiedChildren,
          className: className || props.className
        } as never);
      }
    }
  }

  return <div className={className}>{currentContent}</div>;
};

NavigationalDropdownContainer.displayName = 'NavigationalDropdownContainer';
