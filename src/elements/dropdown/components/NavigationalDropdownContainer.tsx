import React, {useEffect} from 'react';

import {useNavigationalDropdown} from '../context/NavigationalDropdownContext';

interface NavigationalDropdownContainerProps {
  className?: string;
}

export const NavigationalDropdownContainer: React.FC<NavigationalDropdownContainerProps> = ({className}) => {
  const {currentContent, reset} = useNavigationalDropdown();

  useEffect(() => {
    reset();
  }, [reset]);

  if (!currentContent) return null;

  return <div className={className}>{currentContent}</div>;
};

NavigationalDropdownContainer.displayName = 'NavigationalDropdownContainer';
