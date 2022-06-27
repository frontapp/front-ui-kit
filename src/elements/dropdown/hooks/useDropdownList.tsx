/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import _ from 'lodash';
import React, {useCallback, useMemo} from 'react';
import ReactIs from 'react-is';

import {ActionMenuItem, ActionMenuItemProps} from '../../../components/_pre-built/actionMenu/actionMenuItem';
import {SelectItem, SelectItemProps} from '../../../components/_pre-built/select/selectItem';
import {DropdownHeading, DropdownHeadingProps} from '../dropdownHeading';
import {DropdownItem, DropdownItemProps} from '../dropdownItem';
import {DropdownItemSpacer} from '../dropdownItemSpacer';

/*
 * Constants.
 */

const defaultDropdownItemHeight = 30;
const dropdownItemSpacerHeight = 17;
const defaultDropdownItemHeightWithDescription = 46;

/*
 * Interfaces.
 */

interface DropdownItemType {
  type: 'DropdownItem';
  props: DropdownItemProps;
}

interface DropdownHeadingType {
  type: 'DropdownHeading';
  props: DropdownHeadingProps;
}

interface ActionMenuItemType {
  type: 'ActionMenuItem';
  props: ActionMenuItemProps;
}

interface SelectItemType {
  type: 'SelectItem';
  props: SelectItemProps;
}

interface DropdownItemSpacerType {
  type: 'DropdownItemSpacer';
}

type DropdownRenderTypes =
  | DropdownItemType
  | DropdownHeadingType
  | ActionMenuItemType
  | DropdownItemSpacerType
  | SelectItemType;

/*
 * Hook.
 */

export function useDropdownList(children: React.ReactNode) {
  // Compute the items from the children.
  const items = useMemo(() => buildDropdownItemsFromChildren(children), [children]);

  // A function to get the height of the specified dropdown item.
  const getItemHeight = useCallback(
    (index: number) => {
      const item = items[index];

      if (item.type === 'DropdownItemSpacer')
        return dropdownItemSpacerHeight;

      // If the item is of type "DropdownItem" it could have a custom height specified.
      if (item.type === 'DropdownItem') {
        // Prioritize rendering the height if specified.
        if (item.props.height)
          return item.props.height;
        // If it has a description, pass back the default with description
        if (item.props.description)
          return defaultDropdownItemHeightWithDescription;
        // Catch-all item height.
        return defaultDropdownItemHeight;
      }

      // All other items can be the default height.
      return defaultDropdownItemHeight;
    },
    [items]
  );

  // Renders the item at the specified index. This is required since the dropdownList is completely
  // virtual and doesn't know about the react contents, so this can be passed in and we will render
  // the appropriate content.
  const renderItem = useCallback(
    (index: number) => {
      const item = items[index];

      if (item.type === 'DropdownItem')
        return <DropdownItem {...item.props} />;
      if (item.type === 'ActionMenuItem')
        return <ActionMenuItem {...item.props} />;
      if (item.type === 'SelectItem')
        return <SelectItem {...item.props} />;
      if (item.type === 'DropdownHeading')
        return <DropdownHeading {...item.props} />;
      if (item.type === 'DropdownItemSpacer')
        return <DropdownItemSpacer />;

      return null;
    },
    [items]
  );

  // Compute the total for the different heights in the dropdown. This is required for the
  // dropdownList since it uses a virtual scroller.
  const itemsHeight = useMemo(
    () => items.reduce((total, _item, index) => total + getItemHeight(index), 0),
    [items, getItemHeight]
  );

  return {
    itemsCount: items.length,
    itemsHeight,
    getItemHeight,
    renderItem
  };
}

/*
 * Helpers.
 */

/**
 * This function pulls the items from the children passed in to the DropdownList to generate the list of items to render.
 * @param children DropdownList children.
 * @returns A list of types we would want to render in the list.
 */
function buildDropdownItemsFromChildren(children: React.ReactNode): ReadonlyArray<DropdownRenderTypes> {
  return _(
    React.Children.toArray(children).map(child => {
      // We do not need to support an arbitrary number or string being rendered. If we may need to support these
      // we can look at removing this.
      if (typeof child === 'string' || typeof child === 'number')
        return undefined;

      // If the child item is a fragment, we can just look directly at the children instead and this will work recursively.
      // This enables users to pass content like:
      // {BooleanCheck && (<><DropdownItem>Test</DropdownItem></>)}
      if (ReactIs.isFragment(child))
        return buildDropdownItemsFromChildren(child.props.children);

      // This is a check for arbitrary elements such as div, span, etc.
      if (!ReactIs.isElement(child))
        return undefined;

      // Check for specific items that we will support rendering in the list.
      if ((child.type as any)?.displayName === 'DropdownItem')
        return {
          type: 'DropdownItem',
          props: child.props
        } as DropdownItemType;
      if ((child.type as any)?.displayName === 'ActionMenuItem')
        return {
          type: 'ActionMenuItem',
          props: child.props
        } as ActionMenuItemType;
      if ((child.type as any)?.displayName === 'SelectItem')
        return {
          type: 'SelectItem',
          props: child.props
        } as SelectItemType;
      if ((child.type as any)?.displayName === 'DropdownHeading')
        return {
          type: 'DropdownHeading',
          props: child.props
        } as DropdownHeadingType;
      if (
        (child.type as any)?.displayName === 'DropdownItemSpacer' ||
        (child.type as any)?.displayName === 'ActionMenuItemSpacer'
      )
        return {
          type: 'DropdownItemSpacer'
        } as DropdownItemSpacerType;

      // Catchall for all other types, we will not render anything.
      return undefined;
    })
  )
    .flatten()
    .compact()
    .value();
}
