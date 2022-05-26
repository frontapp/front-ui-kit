import React, {FC, useMemo} from 'react';
import styled, {css} from 'styled-components';

import {greys} from '../../helpers/colorHelpers';
import {renderChildrenSpecifiedComponents} from '../../helpers/renderHelpers';
import {DropdownList, dropdownListPadding} from './dropdownList';
import {useDropdownList} from './hooks/useDropdownList';
import {DropdownItemSkeleton} from './skeleton/dropdownItemSkeleton';

/*
 * Constants.
 */

const defaultMaxWidth = 260; // px.
const defaultMaxHeight = 342; // px.
const defaultLoadingSkeletonHeight = 30; // px.
const defaultLoadingSkeletonHeightWithDescription = 46; // px.
const totalLoadingRows = 3;
const defaultLoadingThreshold = 5;

/*
 * Props.
 */

interface DropdownProps {
  /** The maximum width of the dropdown. Defaults to 260. */
  maxWidth?: number;
  /** The minimum height of the dropdown. Defaults to the max height. */
  minHeight?: number;
  /** The maximum height of the dropdown. Defaults to 342. */
  maxHeight?: number;
  /** Children to render for the dropdown. */
  children: React.ReactNode;

  /** Controls if we should render the loading state. */
  isLoading?: boolean;
  /** The loading skeleton we would render. Only supports DropdownItemSkeleton. */
  loadingSkeleton?: React.ReactNode;
  /** Controls when we will call the "onLoadMore" function. Default is when we are within 5 items of the bottom. */
  loadingThreshold?: number;

  /** Controls if we will try to load more items when they reach the loadingThreshold.  */
  hasMore?: boolean;
  /** Called when we request to load more items. */
  onLoadMore?: () => Promise<void>;

  /** Whether the dropdown should render the empty state. */
  isEmpty?: boolean;
  /** Render the empty state for the dropdown. */
  renderEmptyState?: () => React.ReactNode;
}

/*
 * Style.
 */

interface StyledDropdownWrapperDivProps {
  $maxWidth: number;
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
    max-width: ${p.$maxWidth}px;
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
    maxWidth = defaultMaxWidth,
    maxHeight = defaultMaxHeight,
    // The minHeight should default to the max height
    minHeight = maxHeight,
    isLoading,
    hasMore,
    loadingThreshold = defaultLoadingThreshold,
    loadingSkeleton,
    isEmpty,
    onLoadMore,
    renderEmptyState
  } = props;
  const {itemsCount, itemsHeight, getItemHeight, renderItem} = useDropdownList(children);

  // Look at the supplied loading skeleton or default the loading skeleton.
  const loadingSkeletonDefaulted = useMemo(() => buildLoadingSkeleton(loadingSkeleton), [loadingSkeleton]);
  const loadingSkeletonHeight = useMemo(() => computeLoadingSkeletonHeight(loadingSkeletonDefaulted), [loadingSkeletonDefaulted]);

  const renderDropdownListOrEmptyState = () => {
    if (isEmpty && renderEmptyState)
      return renderEmptyState();
    return (
      <DropdownList
        itemsCount={itemsCount}
        loadingItemsCount={hasMore || isLoading ? computeTotalLoadingItems(itemsCount, maxHeight, loadingSkeletonHeight) : 0}
        height={computeHeight(itemsHeight, itemsCount, loadingSkeletonHeight, maxHeight, hasMore)}
        isLoading={isLoading}
        hasMore={hasMore}
        loadingThreshold={loadingThreshold}
        loadingSkeletonHeight={loadingSkeletonHeight}
        loadingSkeleton={loadingSkeletonDefaulted}
        getItemHeight={getItemHeight}
        renderItem={renderItem}
        onLoadMore={onLoadMore || (async () => {})}
      />
    );
  };

  return (
    <StyledDropdownWrapperDiv $maxWidth={maxWidth}>
      {/* Render Dropdown headers / footers. */}
      {renderChildrenSpecifiedComponents(children, ['DropdownHeader', 'DropdownFooter'])}
      <StyledDropdownContentWrapperDiv $maxHeight={maxHeight} $minHeight={minHeight}>
        {renderDropdownListOrEmptyState()}
      </StyledDropdownContentWrapperDiv>
    </StyledDropdownWrapperDiv>
  );
};

/*
 * Helpers.
 */

/** Children may not be a DropdownItemSkeleton, so we need to verify. */
function buildLoadingSkeleton(skeleton?: React.ReactNode): React.ReactNode {
  // If we do not have a skeleton supplied, default to a generic one.
  if (!skeleton)
    return <DropdownItemSkeleton />;

  // Try to pull the DropdownItemSkeleton from the children and return the first one found.
  const dropdownSkeletons = renderChildrenSpecifiedComponents(skeleton, ['DropdownItemSkeleton']);
  return dropdownSkeletons?.[0] || (<DropdownItemSkeleton />);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function computeLoadingSkeletonHeight(loadingSkeleton: any): number {
  if (loadingSkeleton?.props?.hasDescription)
    return defaultLoadingSkeletonHeightWithDescription;
  return defaultLoadingSkeletonHeight;
}

/** If we are initially loading the dropdown, we should fill the entire dropdown with loading indicators, otherwise only should 3. */
function computeTotalLoadingItems(itemsCount: number, maxHeight: number, loadingSkeletonHeight: number) {
  if (itemsCount > 0)
    return totalLoadingRows;
  return Math.floor(maxHeight / loadingSkeletonHeight);
}

function computeHeight(itemsHeight: number, itemsCount: number, loadingSkeletonHeight: number, maxHeight: number, hasMore?: boolean) {
  const totalLoadingRowsToRender = computeTotalLoadingItems(itemsCount, maxHeight, loadingSkeletonHeight);
  // If we are at the first page, we should fill up the dropdown with loading indicators.
  if (itemsCount === 0)
    return maxHeight;
  // If we have more items we can load, make sure to take that into account when calculating the height.
  const itemsWithLoadingHeight = itemsHeight + (hasMore ? loadingSkeletonHeight * totalLoadingRowsToRender : 0);
  return itemsWithLoadingHeight < maxHeight ? itemsWithLoadingHeight + (dropdownListPadding * 2) : maxHeight;
}
