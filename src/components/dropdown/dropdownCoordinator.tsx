/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components';

import {PopoverContext, PopoverContextProps} from '../popover/popoverContext';
import {RepositionPopover, RepositionPopoverProps} from '../popover/repositionPopover';

/*
 * Props.
 */

interface DropdownCoordinatorProps extends Pick<RepositionPopoverProps, 'hasVisibleOverlay' | 'isExclusive' | 'placement'> {
  /** Controls if the dropdown is disabled from opening. If disabled, we will not open anything. */
  isDisabled?: boolean;
  /** Controls if the overlay will close the dropdown. If disabled, we will not close when the overlay is clicked. */
  isOverlayCloseDisabled?: boolean;
  /** Render the button that triggers the dropdown. */
  renderButton: () => React.ReactNode;
  /** Render the dropdown. */
  renderDropdown: (onCloseDropdown: () => void) => React.ReactNode;
  /** Called when the dropdown is first opened. */
  onDropdownOpen?: () => void;
  /** Called when the dropdown is closed. */
  onDropdownClosed?: () => void;
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
  const {isDisabled, hasVisibleOverlay, placement, isOverlayCloseDisabled, onDropdownOpen, onDropdownClosed, renderButton, renderDropdown} = props;
  const [anchorElement, setAnchorElement] = useState<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [context, setContext] = useState<PopoverContextProps | undefined>();

  // When the dropdown is first opened.
  useEffect(() => {
    if (onDropdownOpen)
      onDropdownOpen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (onDropdownClosed)
      onDropdownClosed();
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
