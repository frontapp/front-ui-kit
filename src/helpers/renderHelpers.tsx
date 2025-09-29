import React from 'react';
import * as ReactIs from 'react-is';

/*
 * Types.
 */

type ComponentWithDisplayName = {
  displayName?: string;
};

function isComponentWithDisplayName(elementType: unknown): elementType is ComponentWithDisplayName {
  return typeof elementType === 'function' && 'displayName' in elementType;
}

/*
 * Helpers.
 */

/**
 * Helper to safely get displayName from a React element type
 */
function getDisplayName(elementType: string | React.JSXElementConstructor<unknown>): string | undefined {
  if (isComponentWithDisplayName(elementType)) return elementType.displayName;
  return undefined;
}

/**
 * Takes in children for a component and looks for a specified component display name.
 */
export function isComponentInChildren(children: React.ReactNode, componentDisplayName: string) {
  return React.Children.toArray(children).some((child) => {
    if (typeof child === 'string' || typeof child === 'number') return null;
    if (ReactIs.isFragment(child) || !React.isValidElement(child)) return false;
    return getDisplayName(child.type) === componentDisplayName;
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
    const isIcon = getDisplayName(child.type) === 'Icon';

    if (isIcon && !hasFoundIcon) {
      hasFoundIcon = true;
      const props: React.Attributes & {shouldDisableColor: boolean} = {
        shouldDisableColor
      };
      return React.cloneElement(child, props);
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
    const displayName = getDisplayName(child.type);
    if (displayName && componentsToIgnore.includes(displayName)) return null;

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
    const displayName = getDisplayName(child.type);
    if (displayName && componentsToInclude.includes(displayName)) return child;

    return null;
  });
}
