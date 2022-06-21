import React, {FC} from 'react';

import {Button} from '../../components/button/button';
import {Dropdown} from '../../components/dropdown/dropdown';
import {DropdownCoordinator} from '../../components/dropdown/dropdownCoordinator';
import {Icon} from '../../components/icon/icon';

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
}

/*
 * Component.
 */

export const ActionMenu: FC<ActionMenuProps> = ({children, width = defaultDropdownWidth}) => (
  <DropdownCoordinator
    placement="bottom-end"
    isInline
    renderButton={isDropdownOpen => (
      <Button type="icon" isActive={isDropdownOpen}>
        <Icon name="EllipsisVertical" />
      </Button>
    )}
    renderDropdown={() => (
      <Dropdown maxWidth={width} shouldUseItemsHeight>
        {children}
      </Dropdown>
    )}
  />
);
