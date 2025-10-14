import React, {useEffect, isValidElement, cloneElement, Children} from 'react';

import {useNavigationalDropdown} from '../context/NavigationalDropdownContext';

/**
 * Props for the NavigationalDropdownContainer component
 */
interface NavigationalDropdownContainerProps {
  /** Optional custom class name */
  className?: string;
}

/**
 * Helper to check if a component is a specific type by displayName
 */
const hasDisplayName = (element: React.ReactElement, name: string): boolean => {
  return Boolean(
    element.type &&
      typeof element.type === 'function' &&
      (element.type as {displayName?: string}).displayName === name
  );
};

/**
 * Recursively inject onBackClick into DropdownHeader children
 */
const injectBackClickIntoDropdownHeader = (
  children: React.ReactNode,
  handleBackClick: (event: React.MouseEvent) => void
): React.ReactNode => {
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return child;

    // If this is a DropdownHeader, inject the onBackClick prop
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

/**
 * NavigationalDropdownContainer is the main container component for navigational dropdowns.
 */
export const NavigationalDropdownContainer: React.FC<NavigationalDropdownContainerProps> = ({className}) => {
  const {currentContent, navigateBack, canNavigateBack, reset} = useNavigationalDropdown();

  // Reset to root view whenever the dropdown opens (container mounts)
  useEffect(() => {
    reset();
  }, [reset]);

  const handleBackClick = (event: React.MouseEvent) => {
    // Prevent the event from closing the dropdown
    event.preventDefault();
    event.stopPropagation();
    navigateBack();
  };

  if (!currentContent) return null;

  // If we need a back button and the content is a valid React element, try to inject onBackClick
  if (canNavigateBack && isValidElement(currentContent)) {
    const dropdownElement = currentContent;

    // Check if it's a Dropdown component
    if (hasDisplayName(dropdownElement, 'Dropdown')) {
      const props = dropdownElement.props as {children?: React.ReactNode; className?: string};

      if (props.children) {
        // Inject onBackClick into any DropdownHeader children
        const modifiedChildren = injectBackClickIntoDropdownHeader(props.children, handleBackClick);

        return cloneElement(dropdownElement, {
          ...props,
          children: modifiedChildren,
          className: className || props.className
        } as never);
      }
    }
  }

  // Otherwise, just render the content as-is
  return <div className={className}>{currentContent}</div>;
};

NavigationalDropdownContainer.displayName = 'NavigationalDropdownContainer';
