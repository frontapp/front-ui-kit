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
    if (ReactIs.isFragment(child) || !ReactIs.isElement(child)) return false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (child.type as any)?.displayName === componentDisplayName;
  });
}

/**
 * Takes in children for a component and strips out all content besides the first Icon.
 */
export function renderFirstIconOnly(children: React.ReactNode, shouldDisableColor: boolean = true) {
  let hasFoundIcon = false;

  return React.Children.toArray(children).map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return null;

    // Check if it's a React element by looking for the necessary properties
    const isReactElement =
      child && typeof child === 'object' && '$$typeof' in child && 'type' in child && 'props' in child;

    if (ReactIs.isFragment(child) || !isReactElement) return null;

    // Check for an icon and if we find one make sure we only have 1 icon
    // total that we could render. We also need to display any set colors
    // so the component itself can style the color.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
    const childType = (child as any).type;

    // Check multiple ways to identify the Icon component
    const isIcon =
      childType?.displayName === 'Icon' ||
      childType?.name === 'Icon' ||
      (typeof childType === 'function' && childType.toString().includes('Icon'));

    if (isIcon && !hasFoundIcon) {
      hasFoundIcon = true;
      return React.cloneElement(child as React.ReactElement, {shouldDisableColor});
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
) {
  return React.Children.toArray(children).map((child) => {
    if (typeof child === 'string' || typeof child === 'number') return child;

    // Check if it's a React element by looking for the necessary properties
    const isReactElement =
      child && typeof child === 'object' && '$$typeof' in child && 'type' in child && 'props' in child;

    if (ReactIs.isFragment(child) || !isReactElement) return child;

    // Check if the display name is one we should not render.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (componentsToIgnore.includes((child as any).type?.displayName)) return null;

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
    if (ReactIs.isFragment(child)) return null;

    // Check if it's a React element by looking for $$typeof property
    if (!child || typeof child !== 'object' || !('$$typeof' in child)) return null;

    // Check if the display name is one we should render.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childElement = child as any;
    const displayName = childElement.type?.displayName;
    if (componentsToInclude.includes(displayName)) return child;

    return null;
  });
}
