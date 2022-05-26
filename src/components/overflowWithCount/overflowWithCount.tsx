/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/function-component-definition */
import {ellipsis} from 'polished';
import React, {useLayoutEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components';

import {getWidthWithMarginOfElement} from '../../helpers/domHelpers';
import {useMeasureElement} from '../../helpers/hookHelpers';

/*
 * Constants.
 */

const DefaultItemGap = 4; // px;

/*
 * Props.
 */

interface OverflowWithCountProps<T> {
  elements: ReadonlyArray<T>;
  elementRenderer: (element: T, index: number) => React.ReactNode;
  shouldRenderPartial?: boolean;
  overflowContainerWidth?: number;
  itemGap?: number;
}

interface ElementSizeDetail {
  index: number;
  width: number;
}

/*
 * Style.
 */

const StyledOverflowWithCountContainerDiv = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
`;

interface StyledVisibleElementsDivProps {
  $itemGap: number;
}

const StyledVisibleElementsDiv = styled.div<StyledVisibleElementsDivProps>`
  display: flex;
  flex-flow: row;
  white-space: nowrap;
  overflow: hidden;
  ${p => css`
    gap: ${p.$itemGap}px;
  `};
`;

interface StyledElementWrapperSpanProps {
  $isHidden: boolean;
  $isEllipsisElement: boolean;
  $maxWidth: number;
}
const StyledElementWrapperDiv = styled.div<StyledElementWrapperSpanProps>`
  white-space: nowrap;
  ${p =>
    css`
      max-width: ${p.$maxWidth}px;
    `}

  ${p =>
    p.$isEllipsisElement &&
    css`
      ${ellipsis()}
    `}
  ${p => addHiddenStyles(p)};
`;

function addHiddenStyles(p: StyledElementWrapperSpanProps) {
  if (!p.$isHidden)
    return '';
  return css`
    visibility: hidden;
    position: absolute;
  `;
}

const StyledOverflowSpan = styled.span`
  display: grid;
  place-content: center;
  margin-left: 4px;
`;

/*
 * Component.
 */

export function OverflowWithCount<T extends {}>(props: OverflowWithCountProps<T>) {
  const {
    elements,
    shouldRenderPartial,
    overflowContainerWidth,
    itemGap = DefaultItemGap,
    elementRenderer
  } = props;

  const [rowRef, {width: rowWidth}] = useMeasureElement();
  const [hiddenIndicatorRef, {width: hiddenIndicatorWidth}] = useMeasureElement();
  const visibleContainerRef = useRef<HTMLDivElement>(null);
  const [hideStartIndex, setHideStartIndex] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (!visibleContainerRef.current || !rowWidth)
      return;

    // First calculate the widths of the elements.
    const visibleRender = visibleContainerRef.current;
    const visibleElements = Array.from(visibleRender.children);
    const elementSizeDetails: Array<ElementSizeDetail> = visibleElements.map((visibleElement, index) => ({
      index,
      width: getWidthWithMarginOfElement(visibleElement)
    }));

    // Then figure out which element can fit in the space we have available.
    // We compute the hideStartIndex, which is the index in the array of visible elements at which we should start
    // hiding the element. If currentHideStartIndex never gets set, we don't need to hide any elements.
    const computedHideStartIndex = computeHideStartIndex(
      rowWidth,
      hiddenIndicatorWidth,
      elementSizeDetails,
      shouldRenderPartial,
      overflowContainerWidth,
      itemGap
    );
    setHideStartIndex(computedHideStartIndex);
  }, [
    elements.length,
    rowWidth,
    hiddenIndicatorWidth,
    shouldRenderPartial,
    setHideStartIndex,
    overflowContainerWidth,
    itemGap
  ]);

  return (
    <StyledOverflowWithCountContainerDiv ref={rowRef}>
      <StyledVisibleElementsDiv ref={visibleContainerRef} $itemGap={itemGap}>
        {renderVisibleElements(
          elementRenderer,
          elements,
          hideStartIndex,
          shouldRenderPartial,
          rowWidth - hiddenIndicatorWidth
        )}
      </StyledVisibleElementsDiv>
      {maybeRenderHiddenIndicator(
        hiddenIndicatorRef,
        elements.length,
        hideStartIndex
      )}
    </StyledOverflowWithCountContainerDiv>
  );
}

/*
 * Helpers.
 */

function renderVisibleElements<T>(
  elementRenderer: (element: T, index: number) => React.ReactNode,
  elements: ReadonlyArray<T>,
  hideStartIndex: number | undefined,
  shouldRenderPartial: boolean | undefined,
  maxWidth: number
) {
  return (
    <>
      {elements.map((element, index) => (
        <StyledElementWrapperDiv
          // eslint-disable-next-line react/no-array-index-key
          key={`wrapped-element-${index}`}
          $isHidden={hideStartIndex ? index >= hideStartIndex : false}
          $maxWidth={maxWidth}
          $isEllipsisElement={
            Boolean(shouldRenderPartial && elements.length === 1) ||
            Boolean(shouldRenderPartial && hideStartIndex && hideStartIndex - 1 === index)
          }
        >
          {elementRenderer(element, index)}
        </StyledElementWrapperDiv>
      ))}
    </>
  );
}

function maybeRenderHiddenIndicator(
  ref: (instance: HTMLDivElement | null) => void,
  numberOfElements: number,
  hideStartIndex: number | undefined
) {
  if (!hideStartIndex || hideStartIndex > numberOfElements)
    return null;

  const numberOfHiddenElements = numberOfElements - hideStartIndex;
  if (numberOfHiddenElements === 0)
    return null;
  return <StyledOverflowSpan ref={ref}>+{numberOfHiddenElements}</StyledOverflowSpan>;
}

function computeHideStartIndex(
  rowWidth: number,
  hiddenIndicatorWidth: number,
  sizeDetails: Array<ElementSizeDetail>,
  shouldRenderPartial: boolean | undefined,
  overflowContainerWidth?: number,
  itemGap?: number
) {
  const availableWidth = overflowContainerWidth
    ? overflowContainerWidth - hiddenIndicatorWidth
    : rowWidth - hiddenIndicatorWidth;
  const reducedResult = sizeDetails.reduce(
    (acc, tagSizeDetail) => {
      const currentWidth = acc.currentWidth + tagSizeDetail.width + (itemGap ?? 0);
      let {hideStartIndex} = acc;

      if (currentWidth > availableWidth && hideStartIndex === undefined) {
        hideStartIndex = tagSizeDetail.index;

        // If we're at the boundary, also check if we can fit inside the row width without the indicator width.
        // Applies if we're already showing the indicator and the user resizes the pane such that we don't
        // need to show the indicator anymore.
        if (hideStartIndex === sizeDetails.length - 1 && currentWidth < rowWidth)
          hideStartIndex = undefined;
      }

      return {currentWidth, hideStartIndex};
    },
    {hideStartIndex: undefined, currentWidth: 0} as {hideStartIndex: number | undefined; currentWidth: number}
  );

  if (shouldRenderPartial)
    return reducedResult.hideStartIndex ? reducedResult.hideStartIndex + 1 : undefined;
  return reducedResult.hideStartIndex;
}
