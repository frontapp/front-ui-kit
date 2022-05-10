/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';

import {PopoverContext, PopoverContextProps} from './popoverContext';
import {RepositionPopover, RepositionPopoverProps} from './repositionPopover';

/*
 * Props.
 */

interface DropdownCoordinatorProps extends Omit<RepositionPopoverProps, 'onRequestClose' | 'isExclusive' | 'onClick'> {
  /** Controls if the dropdown is disabled from opening. If disabled, we will not open anything. */
  isDisabled?: boolean;
  /** Controls if the overlay will close the dropdown. If disabled, we will not close when the overlay is clicked. */
  isOverlayCloseDisabled?: boolean;
  /** Render the button that triggers the dropdown. */
  renderButton: () => React.ReactNode;
  /** Render the dropdown. */
  renderDropdown: (onCloseDropdown: () => void) => React.ReactNode;
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
  const {isDisabled, hasVisibleOverlay, placement, isOverlayCloseDisabled, renderButton, renderDropdown} = props;
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

  const onCloseDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <PopoverContext.Provider value={context}>
      <StyledAnchorDiv ref={setAnchorElement} onClick={onClick}>
        {renderButton()}
      </StyledAnchorDiv>
      {isDropdownOpen && (
        <RepositionPopover
          placement={placement}
          hasVisibleOverlay={hasVisibleOverlay}
          onRequestClose={isOverlayCloseDisabled ? undefined : onCloseDropdown}
          isExclusive
        >
          {renderDropdown(onCloseDropdown)}
        </RepositionPopover>
      )}
    </PopoverContext.Provider>
  );
};
