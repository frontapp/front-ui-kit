import React, {FC} from 'react';

import {DropdownItem, DropdownItemProps} from '../../components/dropdown/dropdownItem';

/*
 * Props.
 */

export interface SelectItemProps extends DropdownItemProps {}

/*
 * Component.
 */

// eslint-disable-next-line react/jsx-props-no-spreading
export const SelectItem: FC<SelectItemProps> = props => <DropdownItem {...props} />;
