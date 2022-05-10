import {Placement} from '@popperjs/core';
import React, {FC, useState} from 'react';
import {usePopper} from 'react-popper';

import {usePopoverContext} from './popoverContext';

/*
 * Props.
 */

export interface RepositionProps {
  /** Position of the element relative to the anchor. */
  placement?: Placement;
  children?: React.ReactNode;
}

/*
 * Component.
 */

export const Reposition: FC<RepositionProps> = props => {
  const {placement, children} = props;
  const popoverContext = usePopoverContext();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const {styles, attributes} = usePopper(popoverContext?.anchor, popperElement, {
    placement,
    modifiers: [
      {
        name: 'preventOverflow',
        options: {
          padding: 10,
          boundary: window.document.body
        }
      },
      {
        name: 'computeStyles',
        options: {
          gpuAcceleration: false
        }
      },
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ]
  });

  // Enable prop spreading here as it comes from the popper docs.
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>{children}</div>;
};
