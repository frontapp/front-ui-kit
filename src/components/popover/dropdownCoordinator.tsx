/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';

import {PopoverContext, PopoverContextProps} from './popoverContext';

/*
 * Props.
 */

interface DropdownCoordinatorProps {
  isDisabled?: boolean;
  renderButton: () => React.ReactNode;
  renderDropdown: (onRequestClose: () => void) => React.ReactNode;
}

/*
 * Styles.
 */

const StyledAnchorDiv = styled.div`
  display: inline-block;
`;

/*
 * Component.
 */

export const DropdownCoordinator: FC<DropdownCoordinatorProps> = props => {
  const {isDisabled, renderButton, renderDropdown} = props;
  const [anchorElement, setAnchorElement] = useState<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [context, setContext] = useState<PopoverContextProps | undefined>();

  useEffect(() => {
    if (!anchorElement)
      return;
    setContext({
      anchor: anchorElement
    });
  }, [anchorElement]);

  const onClick = () => {
    if (isDisabled)
      return;
    setIsDropdownOpen(true);
  };

  const onRequestClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <PopoverContext.Provider value={context}>
      <StyledAnchorDiv ref={setAnchorElement} onClick={onClick}>
        {renderButton()}
      </StyledAnchorDiv>
      {isDropdownOpen && renderDropdown(onRequestClose)}
    </PopoverContext.Provider>
  );
};
