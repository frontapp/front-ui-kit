import React, {FC, useEffect} from 'react';
import styled, {css} from 'styled-components';

import {greys} from '../../helpers/colorHelpers';
import {renderChildrenSpecifiedComponents} from '../../helpers/renderHelpers';
import {DropdownList, dropdownListPadding} from './dropdownList';
import {useDropdownList} from './hooks/useDropdownList';
import {DropdownItemSkeleton} from './skeleton/dropdownItemSkeleton';

/*
 * Constants.
 */

const defaultWidth = 260; // px.
const defaultMaxHeight = 342; // px.
const fallbackLoadingStateHeight = 30; // px.
const totalLoadingRows = 3;
const defaultLoadingThreshold = 5;

/*
 * Props.
 */

interface DropdownProps {
  /** The maximum width of the dropdown. Defaults to 260. */
  width?: number;
  /** The minimum height of the dropdown. Defaults to unset. */
  minHeight?: number;
  /** The maximum height of the dropdown. Defaults to 342. */
  maxHeight?: number;
  /** Children to render for the dropdown. */
  children: React.ReactNode;
  /** Called when the dropdown is first opened. */
  onDropdownOpen?: () => void;
  /** Controls if we will try to load more items when they reach the loadingThreshold.  */
  hasMore?: boolean;
  /** Controls if we should render the loading state. */
  isLoading?: boolean;
  /** Controls the height of the loading state items. This should match the same height as your dropdown items. */
  loadingStateHeight?: number;
  /** Controls when we will call the "onLoadMore" function. Default is when we are within 5 items of the bottom. */
  loadingThreshold?: number;
  /** The loading state to render. This is per called per loading item. Default is a simple loading item. */
  renderLoadingState?: () => React.ReactNode;
  /** Called when we request to load more items. */
  onLoadMore?: () => Promise<void>;
}

/*
 * Style.
 */

interface StyledDropdownWrapperDivProps {
  $width?: number;
}

const StyledDropdownWrapperDiv = styled.div<StyledDropdownWrapperDivProps>`
  display: grid;
  grid-template-areas: "header"
                       "content"
                       "footer";
  border-radius: 8px;
  background: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border: 1px solid ${greys.shade40};
  width: 100%;
  overflow: auto;
  ${p => css`
    width: ${p.$width ?? defaultWidth}px;
  `}
`;

interface StyledDropdownContentWrapperDivProps {
  $maxHeight: number;
  $minHeight?: number;
}

const StyledDropdownContentWrapperDiv = styled.div<StyledDropdownContentWrapperDivProps>`
  grid-area: content;
  ${p => addDropdownContentStyles(p)};
`;

function addDropdownContentStyles(props: StyledDropdownContentWrapperDivProps) {
  return css`
    min-height: ${props.$minHeight ? `${props.$minHeight}px` : 'unset'};
    max-height: ${props.$maxHeight}px;
  `;
}

/*
 * Component.
 */

export const Dropdown: FC<DropdownProps> = props => {
  const {
    children,
    width,
    maxHeight = defaultMaxHeight,
    minHeight,
    loadingStateHeight,
    isLoading,
    hasMore,
    loadingThreshold = defaultLoadingThreshold,
    onDropdownOpen,
    renderLoadingState,
    onLoadMore
  } = props;
  const {itemsCount, itemsHeight, getItemHeight, renderItem} = useDropdownList(children);
  const loadingItemHeight = loadingStateHeight || fallbackLoadingStateHeight;

  // When the dropdown is first opened.
  useEffect(() => {
    if (onDropdownOpen)
      onDropdownOpen();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledDropdownWrapperDiv $width={width}>
      {/* Render Dropdown headers / footers. */}
      {renderChildrenSpecifiedComponents(children, ['DropdownHeader', 'DropdownFooter'])}
      <StyledDropdownContentWrapperDiv $maxHeight={maxHeight} $minHeight={minHeight}>
        <DropdownList
          itemsCount={itemsCount}
          loadingItemsCount={hasMore || isLoading ? computeTotalLoadingItems(itemsCount, maxHeight, loadingItemHeight) : 0}
          height={computeHeight(itemsHeight, itemsCount, loadingItemHeight, maxHeight, hasMore)}
          loadingStateHeight={loadingItemHeight}
          isLoading={isLoading}
          hasMore={hasMore}
          loadingThreshold={loadingThreshold}
          getItemHeight={getItemHeight}
          renderItem={renderItem}
          renderLoadingState={renderLoadingState || (() => <DropdownItemSkeleton />)}
          onLoadMore={onLoadMore || (async () => {})}
        />
      </StyledDropdownContentWrapperDiv>
    </StyledDropdownWrapperDiv>
  );
};

/*
 * Helpers.
 */

function computeTotalLoadingItems(itemsCount: number, maxHeight: number, loadingStateHeight: number) {
  if (itemsCount > 0)
    return totalLoadingRows;
  return Math.floor(maxHeight / loadingStateHeight);
}

function computeHeight(itemsHeight: number, itemsCount: number, loadingStateHeight: number, maxHeight: number, hasMore?: boolean) {
  const totalLoadingRowsToRender = computeTotalLoadingItems(itemsCount, maxHeight, loadingStateHeight);
  // If we are at the first page, we should fill up the dropdown with loading indicators.
  if (itemsCount === 0)
    return totalLoadingRowsToRender * loadingStateHeight;
  // If we have more items we can load, make sure to take that into account when calculating the height.
  const itemsWithLoadingHeight = itemsHeight + (hasMore ? loadingStateHeight * totalLoadingRowsToRender : 0);
  return itemsWithLoadingHeight < maxHeight ? itemsWithLoadingHeight + (dropdownListPadding * 2) : maxHeight;
}
