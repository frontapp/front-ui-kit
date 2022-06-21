import React, {FC, MouseEventHandler} from 'react';

import {DropdownItem} from '../../components/dropdown/dropdownItem';
import {DropdownItemIcon} from '../../components/dropdown/dropdownItemIcon';
import {IconName} from '../../components/icon/icon';
import {Tooltip} from '../../components/tooltip/tooltip';
import {TooltipCoordinator} from '../../components/tooltip/tooltipCoordinator';
import {greys} from '../../helpers/colorHelpers';

/*
 * Props.
 */

export interface ActionMenuItemProps {
  /** Label for the menu item. */
  children: string;
  /** Controls if an icon is rendered on the left. */
  iconName?: IconName;
  /** Called when the action menu item is clicked. */
  onClick?: MouseEventHandler;
}

/*
 * Component.
 */

export const ActionMenuItem: FC<ActionMenuItemProps> = props => {
  const {iconName, children, onClick} = props;
  return (
    <DropdownItem onClick={onClick}>
      {iconName && <DropdownItemIcon iconName={iconName} color={greys.shade70} />}
      <TooltipCoordinator condition={{type: 'overflow'}} renderTooltip={() => renderTooltip(children)}>
        {children}
      </TooltipCoordinator>
    </DropdownItem>
  );
};

/*
 * Helpers.
 */

function renderTooltip(label: string) {
  return (
    <Tooltip>
      {label}
    </Tooltip>
  );
}
