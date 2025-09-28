import React from 'react';
import * as ReactIs from 'react-is';

/*
 * Helpers.
 */

/**
 * Takes in children for a component and looks for a specified component display name.
 */
export function isComponentInChildren(children: React.ReactNode, componentDisplayName: string) {
  return React.Children.toArray(children).some((child) => {
    if (typeof child === 'string' || typeof child === 'number') return null;
    if (ReactIs.isFragment(child) || !React.isValidElement(child)) return false;
    const childElement = child as React.ReactElement;
    const childType = childElement.type as {displayName?: string};
    return childType?.displayName === componentDisplayName;
  });
}

/**
 * Takes in children for a component and strips out all content besides the first Icon.
 */
export function renderFirstIconOnly(children: React.ReactNode, shouldDisableColor: boolean = true) {
  let hasFoundIcon = false;

  return React.Children.toArray(children).map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return null;

    if (ReactIs.isFragment(child) || !React.isValidElement(child)) return null;

    // Check for an icon and if we find one make sure we only have 1 icon
    // total that we could render. We also need to display any set colors
    // so the component itself can style the color.
    const childElement = child as React.ReactElement;
    const childType = childElement.type as {displayName?: string};
    const isIcon = childType?.displayName === 'Icon';

    if (isIcon && !hasFoundIcon) {
      hasFoundIcon = true;
      return React.cloneElement(childElement, {shouldDisableColor} as any);
    }
    return null;
  });
}

/**
 * Takes in children for a component and strips out any specified component.
 */
export function renderChildrenIgnoreSpecifiedComponents(
  children: React.ReactNode,
  componentsToIgnore: ReadonlyArray<string>
): React.ReactNode[] {
  return React.Children.toArray(children).map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return child;

    if (ReactIs.isFragment(child) || !React.isValidElement(child)) return child;

    // Check if the display name is one we should not render.
    const childElement = child as React.ReactElement;
    const childType = childElement.type as {displayName?: string};
    if (childType?.displayName && componentsToIgnore.includes(childType.displayName)) return null;

    return child;
  });
}

/**
 * Takes in children for a component and renders only the specified components.
 */
export function renderChildrenSpecifiedComponents(
  children: React.ReactNode,
  componentsToInclude: ReadonlyArray<string>
): React.ReactNode[] {
  return React.Children.toArray(children).map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return null;
    if (ReactIs.isFragment(child) || !React.isValidElement(child)) return null;

    // Check if the display name is one we should render.
    const childElement = child as React.ReactElement;
    const childType = childElement.type as {displayName?: string};
    const displayName = childType?.displayName;
    if (displayName && componentsToInclude.includes(displayName)) return child;

    return null;
  });
}
