import React, { ComponentType, FC, forwardRef, useEffect, useRef } from 'react';
import { ListChildComponentProps, VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { usePrevious } from '../../helpers/hookHelpers';

/*
 * Constants.
 */

export const dropdownListPadding = 5; // px.

/*
 * Props.
 */

interface DropdownListProps {
  /** The total numbers of items in the dropdown. */
  itemsCount: number;
  /** The total number of loading items we should render. */
  loadingItemsCount: number;
  /** The height of the list. */
  height: number;
  /** Whether we have more items and should call onLoadMore when we reach the threshold. */
  hasMore?: boolean;
  /** Whether we are loading. */
  isLoading?: boolean;
  /** The loading skeleton to render. */
  loadingSkeleton: React.ReactNode;
  /** The height of the loading skeleton. */
  loadingSkeletonHeight: number;
  /** The threshold for when we should call onLoadMore. */
  loadingThreshold: number;
  /** Returns the height of the item at the index. */
  getItemHeight: (index: number) => number;
  /** Renders the item at the index. */
  renderItem: (index: number) => React.ReactNode;
  /** Called when we should load more items. */
  onLoadMore: () => Promise<void>;
}

type RenderChild = ComponentType<ListChildComponentProps>;

/*
 * Component.
 */

export const DropdownList: FC<DropdownListProps> = (props) => {
  const {
    itemsCount,
    loadingItemsCount,
    height,
    isLoading,
    hasMore,
    loadingSkeletonHeight,
    loadingThreshold,
    loadingSkeleton,
    getItemHeight,
    renderItem,
    onLoadMore
  } = props;

  const listRef = useRef<VariableSizeList>(null);
  const previousIsLoading = usePrevious(isLoading);
  const loadingIndexRef = useRef<number>(itemsCount);

  useEffect(() => {
    // If we are now loading, we should track the index of the loading items.
    if (isLoading && !previousIsLoading) {
      loadingIndexRef.current = itemsCount;

      // When we first load, there is a chance that we are maintaining the last measurements from the previous
      // render of the dropdown if it was opened. This clears those values.
      if (itemsCount === 0 && listRef.current) listRef.current.resetAfterIndex(0);
    }

    // If we were loading but we are no longer, we should reset the measurements for the list after the last
    // index. This solves any issues where the loading skeleton could be a different size than the list items.
    // Ref: https://react-window.vercel.app/#/api/VariableSizeList
    if (!isLoading && previousIsLoading && listRef.current && typeof loadingIndexRef.current !== 'undefined')
      listRef.current.resetAfterIndex(loadingIndexRef.current);
  }, [isLoading, previousIsLoading, itemsCount]);

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasMore || isLoading ? itemsCount + loadingItemsCount : itemsCount;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => (!hasMore && !isLoading) || index < itemsCount;

  // Compute the item height for the row. If the row is the loading row, we need to pull a custom height.
  const computeItemHeight = (index: number) => {
    if (!isItemLoaded(index)) return loadingSkeletonHeight;
    return getItemHeight(index);
  };

  const renderChild: RenderChild = ({ index, style }) => {
    const updateStyle = {
      ...style,
      top: `${parseFloat(style.top?.toString() || '0') + dropdownListPadding}px`
    };
    if (!isItemLoaded(index)) return <div style={updateStyle}>{loadingSkeleton}</div>;
    return <div style={updateStyle}>{renderItem(index)}</div>;
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={isLoading ? () => { } : onLoadMore}
      threshold={loadingThreshold}>
      {({ onItemsRendered, ref: infiniteLoaderListRef }) => (
        <VariableSizeList
          ref={(ref: VariableSizeList) => {
            listRef.current = ref;
            infiniteLoaderListRef(ref);
          }}
          height={height}
          itemCount={itemCount}
          itemSize={computeItemHeight}
          innerElementType={innerElementType}
          width="100%"
          onItemsRendered={onItemsRendered}>
          {renderChild}
        </VariableSizeList>
      )}
    </InfiniteLoader>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const innerElementType = forwardRef<any, any>(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      height: `${parseFloat(style.height) + dropdownListPadding * 2}px`
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
  />
));
