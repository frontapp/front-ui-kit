import React from "react";
import * as ReactIs from "react-is";

/*
 * Helpers.
 */

/**
 * Takes in children for a component and strips out all content besides the first Icon.
 */
export function renderButtonIconContent(children: React.ReactNode) {
  let hasFoundIcon = false;
  return React.Children.toArray(children).map(child => {
    if (typeof child === 'string' || typeof child === 'number')
      return null;
    if (ReactIs.isFragment(child) || !ReactIs.isElement(child))
      return null;

    // Check for an icon and if we find one make sure we only have 1 icon
    // total that we could render. We also need to display any set colors
    // so the button itself can style the color.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
    if ((child.type as any)?.displayName === 'Icon' && !hasFoundIcon) {
      hasFoundIcon = true;
      return React.cloneElement(child, {shouldDisableColor: true});
    }
    return null;
  });
}
