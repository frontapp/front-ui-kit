/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {FC, MouseEvent, useEffect, useState} from 'react';
import styled, {css} from 'styled-components';

import {PopoverContext, PopoverContextProps} from '../../components/popover/popoverContext';
import {RepositionPopover, RepositionPopoverProps} from '../../components/popover/repositionPopover';
import {useMeasureElement} from '../../helpers/hookHelpers';

/*
 * Props.
 */

interface DropdownCoordinatorProps
  extends Pick<RepositionPopoverProps, 'hasVisibleOverlay' | 'isExclusive' | 'placement'> {
  /** Controls if the dropdown is disabled from opening. If disabled, we will not open anything. */
  isDisabled?: boolean;
  /** Controls if the overlay will close the dropdown. If disabled, we will not close when the overlay is clicked. */
  isOverlayCloseDisabled?: boolean;
  /** Controls whether the dropdown anchor should be inline-block or block. */
  isInline?: boolean;
  /** The max width of the anchor item. */
  maxWidth?: number;
  /** Specify a different layer id to tie the dropdown to. */
  layerRootId?: string;
  /** Render the button that triggers the dropdown. */
  renderButton: (
    isDropdownOpen: boolean,
    isDisabled: boolean,
    buttonRef: (instance: HTMLDivElement | null) => void
  ) => React.ReactNode;
  /** Render the dropdown. */
  renderDropdown: (onCloseDropdown: () => void, buttonWidth: number) => React.ReactNode;
  /** Called when the dropdown is first opened. */
  onDropdownOpen?: () => void;
  /** Called when the dropdown is closed. */
  onDropdownClosed?: () => void;
}

/*
 * Styles.
 */

interface StyledAnchorDivProps {
  $isInline?: boolean;
  $maxWidth?: number;
}

const StyledAnchorDiv = styled.div<StyledAnchorDivProps>`
  display: block;
  ${(p) =>
    p.$maxWidth &&
    css`
      max-width: ${p.$maxWidth}px;
    `}

  ${(p) =>
    p.$isInline &&
    css`
      display: inline-block;
    `};
`;

/*
 * Component.
 */

export const DropdownCoordinator: FC<DropdownCoordinatorProps> = (props) => {
  const {
    isDisabled,
    hasVisibleOverlay,
    placement,
    isOverlayCloseDisabled,
    isInline,
    maxWidth,
    layerRootId,
    onDropdownOpen,
    onDropdownClosed,
    renderButton,
    renderDropdown
  } = props;
  const [anchorElement, setAnchorElement] = useState<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [context, setContext] = useState<PopoverContextProps | undefined>();
  const [buttonRef, {width: buttonWidth}] = useMeasureElement();

  useEffect(() => {
    if (!anchorElement) return;
    setContext({
      anchor: anchorElement
    });
  }, [anchorElement]);

  const onClick = (event: MouseEvent) => {
    if (isDisabled) return;
    event.preventDefault();
    if (onDropdownOpen) onDropdownOpen();
    setIsDropdownOpen(true);
  };

  const onCloseDropdown = () => {
    setIsDropdownOpen(false);
    if (onDropdownClosed) onDropdownClosed();
  };

  return (
    <PopoverContext.Provider value={context}>
      <StyledAnchorDiv ref={setAnchorElement} onClick={onClick} $isInline={isInline} $maxWidth={maxWidth}>
        {renderButton(isDropdownOpen, Boolean(isDisabled), buttonRef)}
      </StyledAnchorDiv>
      {isDropdownOpen && (
        <RepositionPopover
          placement={placement}
          hasVisibleOverlay={hasVisibleOverlay}
          onRequestClose={isOverlayCloseDisabled ? undefined : onCloseDropdown}
          isExclusive
          layerRootId={layerRootId}>
          {renderDropdown(onCloseDropdown, buttonWidth)}
        </RepositionPopover>
      )}
    </PopoverContext.Provider>
  );
};
