import {Placement} from '@popperjs/core';
import maxSize from 'popper-max-size-modifier';
import React, {FC, useState} from 'react';
import {Modifier, usePopper} from 'react-popper';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const applyMaxSize: Modifier<any> = {
  name: 'applyMaxSize',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['maxSize'],
  fn({state}) {
    // The `maxSize` modifier provides this data
    const {width, height} = state.modifiersData.maxSize;

    // eslint-disable-next-line no-param-reassign
    state.styles.popper = {
      ...state.styles.popper,
      maxWidth: `${width}px`,
      maxHeight: `${height}px`,
      width: '100%'
    };
  }
};

export const Reposition: FC<RepositionProps> = props => {
  const {placement, children} = props;
  const popoverContext = usePopoverContext();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  const {styles, attributes} = usePopper(popoverContext?.anchor, popperElement, {
    placement,
    modifiers: [
      {
        ...maxSize,
        options: {
          padding: {
            top: 10,
            left: 10,
            bottom: 10,
            right: 10
          },
          boundary: window.document.body
        }
      },
      applyMaxSize,
      {
        name: 'preventOverflow',
        options: {
          padding: 10,
          boundary: window.document.body,
          altAxis: true
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
      },
      {
        name: 'flip'
      }
    ]
  });

  // Enable prop spreading here as it comes from the popper docs.
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>{children}</div>;
};
