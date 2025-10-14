import React, {Children, cloneElement, isValidElement, useEffect} from 'react';

import {useNavigationalDropdown} from '../context/NavigationalDropdownContext';

interface NavigationalDropdownContainerProps {
  className?: string;
}

const hasDisplayName = (element: React.ReactElement, name: string): boolean => {
  const elementType = element.type;
  if (!elementType || typeof elementType !== 'function') return false;

  return 'displayName' in elementType && elementType.displayName === name;
};

const injectBackClickIntoDropdownHeader = (
  children: React.ReactNode,
  handleBackClick: (event: React.MouseEvent) => void
): React.ReactNode =>
  Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    if (hasDisplayName(child, 'DropdownHeader')) {
      const additionalProps = {
        onBackClick: handleBackClick
      };
      return cloneElement<typeof child.props>(child, additionalProps);
    }

    return child;
  });

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
      const elementProps = dropdownElement.props;

      if (elementProps && typeof elementProps === 'object' && 'children' in elementProps) {
        const children = elementProps.children as React.ReactNode;
        const modifiedChildren = injectBackClickIntoDropdownHeader(children, handleBackClick);

        const newProps = {
          ...elementProps,
          children: modifiedChildren,
          className: className || ('className' in elementProps ? elementProps.className : undefined)
        };
        return cloneElement<typeof dropdownElement.props>(dropdownElement, newProps);
      }
    }
  }

  return <div className={className}>{currentContent}</div>;
};

NavigationalDropdownContainer.displayName = 'NavigationalDropdownContainer';
