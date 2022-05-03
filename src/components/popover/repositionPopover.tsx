import React, {FC} from 'react';
import styled from 'styled-components';

import {Layer, LayerProps} from '../layer/layer';
import {Reposition, RepositionProps} from './reposition';

/*
 * Props.
 */

export interface RepositionPopoverProps extends LayerProps, RepositionProps {
  hasBackground?: boolean;
  onRequestClose?: () => void;
}

/*
 * Style.
 */

interface StyledBackgroundDivProps {
  $hasBackground?: boolean;
}
const StyledBackgroundDiv = styled.div<StyledBackgroundDivProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${p => (p.$hasBackground ? 'rgba(0, 0, 0, 0.3)' : 'transparent')};
`;

/*
 * Component.
 */

export const RepositionPopover: FC<RepositionPopoverProps> = props => {
  const {hasBackground, isExclusive, isInteractive, placement, children, onRequestClose} = props;
  return (
    <Layer isExclusive={isExclusive} isInteractive={isInteractive} onClick={onRequestClose}>
      {props.isExclusive && <StyledBackgroundDiv $hasBackground={hasBackground} onClick={onRequestClose} />}
      <Reposition placement={placement}>{children}</Reposition>
    </Layer>
  );
};
