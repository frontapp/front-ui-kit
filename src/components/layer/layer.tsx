import React, {FC, useLayoutEffect, useState} from 'react';
import {createPortal} from 'react-dom';
import styled from 'styled-components';

/*
 * Props.
 */

export interface LayerProps {
  isExclusive?: boolean;
  isInteractive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

/*
 * Style.
 */

interface LayerStyleProps {
  $isExclusive?: boolean;
  $isInteractive?: boolean;
}

const StyledLayerDiv = styled.div<LayerStyleProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  /** Catch pointer events if and only if we are an exclusive layer. */
  pointer-events: ${p => (p.$isExclusive ? 'auto' : 'none')};

  & > * {
    pointer-events: ${p => (p.$isInteractive ? 'auto' : 'none')};
  }
`;

/*
 * Component.
 */

export const Layer: FC<LayerProps> = props => {
  const {isExclusive, isInteractive, children, onClick} = props;
  const [nodes, setNodes] = useState<{nodeWrapper: HTMLElement; nodeContent: HTMLElement}>();

  useLayoutEffect(() => {
    const {document} = window;

    // Create the outer container, which holds our child layers.
    const nodeWrapper = document.createElement('div');
    nodeWrapper.className = 'layer';
    nodeWrapper.style.position = 'absolute';
    nodeWrapper.style.inset = '0';

    // Create our inner container, which holds the children that are not nested inside a child layer.
    const nodeContent = document.createElement('div');
    nodeContent.className = 'layer';
    nodeContent.style.position = 'absolute';
    nodeContent.style.inset = '0';
    nodeWrapper.appendChild(nodeContent);

    const destroyLayer = createLayer(nodeWrapper);

    setNodes({nodeWrapper, nodeContent});
    return () => {
      destroyLayer();
    };
  }, []);

  if (!nodes)
    return null;

  const content = (
    <StyledLayerDiv
      $isExclusive={isExclusive}
      $isInteractive={isInteractive}
      onClick={onClick}
    >
      {children}
    </StyledLayerDiv>
  );

  return createPortal(content, nodes.nodeContent);
};

/*
 * Helpers.
 */

function createLayer(node: HTMLElement) {
  window.document.body.appendChild(node);

  return () => {
    node.remove();
  };
}
