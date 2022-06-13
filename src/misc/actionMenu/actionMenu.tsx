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
  /** The width of the action menu, defaults to 150px. */
  width?: number;
  /** Content of the Action Menu. */
  children: React.ReactNode;
}

/*
 * Component.
 */

export const ActionMenu: FC<ActionMenuProps> = props => {
  const {children, width = defaultDropdownWidth} = props;
  return (
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
};
