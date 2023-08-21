import React, {FC, useEffect} from 'react';

import {greys} from '../helpers/colorHelpers';
import {fonts} from '../helpers/fontHelpers';

/*
 * Constants.
 */

const defaultStyleElementId = 'default-front-styles-id';
const defaultStylesClassName = 'default-front-base-styles';

/*
 * Component.
 */

export const DefaultStyleProvider: FC<{children?: React.ReactNode}> = ({children}) => {
  useEffect(() => {
    // Make sure the window object exists.
    if (!window || !window.document) return;

    // Pull the values from the document we need.
    const {document} = window;
    const headElement = document.getElementsByTagName('head')[0];
    const bodyElement = document.getElementsByTagName('body')[0];

    // If the style object already exists, do not re-create it but check to make sure the body
    // element has the proper class on it.
    if (document.getElementById(defaultStyleElementId)) {
      if (!bodyElement.classList.contains(defaultStylesClassName))
        bodyElement.classList.add(defaultStylesClassName);
      return;
    }

    // Create the style object and defined the class.
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.id = defaultStyleElementId;
    styleTag.innerHTML = `.${defaultStylesClassName} { font-family: ${fonts.system}; color: ${greys.black}; }`;
    headElement.appendChild(styleTag);

    // Add the class to the body element.
    bodyElement.classList.add(defaultStylesClassName);
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
