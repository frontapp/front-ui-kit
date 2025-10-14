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

  // If we need a back button and the content has a Dropdown with DropdownHeader, inject onBackClick
  if (canNavigateBack && isValidElement(currentContent)) {
    const dropdownElement = currentContent;

    // Check if it's a Dropdown component
    const isDropdown =
      dropdownElement.type &&
      typeof dropdownElement.type === 'function' &&
      (dropdownElement.type as {displayName?: string}).displayName === 'Dropdown';

    if (isDropdown) {
      const props = dropdownElement.props as {children?: React.ReactNode};

      if (props.children) {
        // Clone the Dropdown and inject onBackClick into any DropdownHeader children
        const modifiedChildren = Children.map(props.children, (child) => {
          if (!isValidElement(child)) return child;

          // Check if this is a DropdownHeader component
          const isDropdownHeader =
            child.type &&
            typeof child.type === 'function' &&
            (child.type as {displayName?: string}).displayName === 'DropdownHeader';

          if (isDropdownHeader) {
            // Inject onBackClick into DropdownHeader
            return cloneElement(
              child as React.ReactElement,
              {
                onBackClick: handleBackClick
              } as never
            );
          }

          return child;
        });

        return cloneElement(dropdownElement, {
          children: modifiedChildren,
          className
        } as never);
      }
    }
  }

  // Otherwise, just render the content as-is
  return <div className={className}>{currentContent}</div>;
};

NavigationalDropdownContainer.displayName = 'NavigationalDropdownContainer';
