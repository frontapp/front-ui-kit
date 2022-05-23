import React, {FC} from 'react';
import styled from 'styled-components';

import {Layer, LayerProps} from '../layer/layer';
import {Reposition, RepositionProps} from './reposition';

/*
 * Props.
 */

export interface RepositionPopoverProps extends LayerProps, RepositionProps {
  /** Controls if the overlay should be transparent or has a slight black shade. */
  hasVisibleOverlay?: boolean;
  onRequestClose?: () => void;
}

/*
 * Style.
 */

interface StyledBackgroundDivProps {
  $hasVisibleOverlay?: boolean;
}
const StyledBackgroundDiv = styled.div<StyledBackgroundDivProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${p => (p.$hasVisibleOverlay ? 'rgba(0, 0, 0, 0.3)' : 'transparent')};
`;

/*
 * Component.
 */

export const RepositionPopover: FC<RepositionPopoverProps> = props => {
  const {hasVisibleOverlay, isExclusive, placement, children, onRequestClose} = props;
  return (
    <Layer
      isExclusive={isExclusive}
      onClick={event => {
        // If this click event was already handled, do not request to close.
        if (event.defaultPrevented || !onRequestClose)
          return;
        onRequestClose();
      }}
    >
      {props.isExclusive && <StyledBackgroundDiv $hasVisibleOverlay={hasVisibleOverlay} onClick={onRequestClose} />}
      <Reposition placement={placement}>{children}</Reposition>
    </Layer>
  );
};
