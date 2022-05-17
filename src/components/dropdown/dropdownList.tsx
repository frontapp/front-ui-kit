import React, {ComponentType, FC, forwardRef} from 'react';
import {ListChildComponentProps, VariableSizeList} from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

/*
 * Constants.
 */

const dropdownListPadding = 5; // px.

/*
 * Props.
 */

interface DropdownListProps {
  itemsCount: number;
  loadingItemsCount: number;
  height: number;
  hasMore?: boolean;
  isLoading?: boolean;
  loadingStateHeight: number;
  loadingThreshold?: number;
  getItemHeight: (index: number) => number;
  renderItem: (index: number) => React.ReactNode;
  renderLoadingState: () => React.ReactNode;
  onLoadMore: () => Promise<void>;
}

type RenderChild = ComponentType<ListChildComponentProps>;

/*
 * Component.
 */

export const DropdownList: FC<DropdownListProps> = props => {
  const {
    itemsCount,
    loadingItemsCount,
    height,
    isLoading,
    hasMore,
    loadingStateHeight,
    loadingThreshold,
    getItemHeight,
    renderItem,
    onLoadMore,
    renderLoadingState
  } = props;

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasMore ? itemsCount + loadingItemsCount : itemsCount;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) => !hasMore || index < itemsCount;

  // Compute the item height for the row. If the row is the loading row, we need to pull a custom height.
  const computeItemHeight = (index: number) => {
    if (!isItemLoaded(index))
      return loadingStateHeight;
    return getItemHeight(index);
  };

  const renderChild: RenderChild = ({index, style}) => {
    const updateStyle = {
      ...style,
      top: `${parseFloat(style.top?.toString() || '0') + dropdownListPadding}px`
    };
    if (!isItemLoaded(index))
      return <div style={updateStyle}>{renderLoadingState()}</div>;
    return <div style={updateStyle}>{renderItem(index)}</div>;
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={isLoading ? () => {} : onLoadMore}
      threshold={loadingThreshold}
    >
      {({onItemsRendered, ref}) => (
        <VariableSizeList
          ref={ref}
          height={height}
          itemCount={itemCount}
          itemSize={computeItemHeight}
          innerElementType={innerElementType}
          width="100%"
          onItemsRendered={onItemsRendered}
        >
          {renderChild}
        </VariableSizeList>
      )}
    </InfiniteLoader>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const innerElementType = forwardRef<any, any>(({style, ...rest}, ref) => (
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
