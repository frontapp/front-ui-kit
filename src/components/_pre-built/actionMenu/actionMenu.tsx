import React, {FC} from 'react';

import {Dropdown} from '../../../elements/dropdown/dropdown';
import {DropdownCoordinator} from '../../../elements/dropdown/dropdownCoordinator';
import {Icon} from '../../../elements/icon/icon';
import {Button} from '../../button/button';

/*
 * Constants.
 */

const defaultDropdownWidth = 150; // px.

/*
 * Props.
 */

interface ActionMenuProps {
  /** Content of the Action Menu, should be ActionMenuItem or ActionMenuItemSpacer. */
  children: React.ReactNode;
  /** The width of the action menu. */
  width?: number;
  /** Specify a different layer id to tie the dropdown to. */
  layerRootId?: string;
}

/*
 * Component.
 */

export const ActionMenu: FC<ActionMenuProps> = ({children, width = defaultDropdownWidth, layerRootId}) => (
  <DropdownCoordinator
    placement="bottom-end"
    isInline
    renderButton={(isDropdownOpen, isDisabled, buttonRef, onClick) => (
      <Button type="icon" isActive={isDropdownOpen} onClick={onClick}>
        <Icon name="EllipsisVertical" />
      </Button>
    )}
    renderDropdown={(onCloseDropdown, buttonWidth) => (
      <Dropdown maxWidth={width} minWidth={width} shouldUseItemsHeight>
        {children}
      </Dropdown>
    )}
    layerRootId={layerRootId}
  />
);
