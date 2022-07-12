import {Placement} from '@popperjs/core';
import _ from 'lodash';
import React, {FC, useMemo} from 'react';

import {Dropdown} from '../../../elements/dropdown/dropdown';
import {DropdownButton} from '../../../elements/dropdown/dropdownButton';
import {DropdownCoordinator} from '../../../elements/dropdown/dropdownCoordinator';
import {DropdownHeader} from '../../../elements/dropdown/dropdownHeader';
import {EmptyState} from '../../../elements/emptyState/emptyState';
import {renderChildrenSpecifiedComponents} from '../../../helpers/renderHelpers';

/*
 * Constants.
 */

const loadingThreshold = 3;

/*
 * Props.
 */

interface SelectProps {
  /** The selected values to render. */
  selectedValues?: string | ReadonlyArray<string>;
  /** Content of the select to render. */
  children: React.ReactNode;
  /** The maximum width of the dropdown. */
  maxWidth?: number;
  /** The minimum height of the dropdown. */
  minHeight?: number;
  /** The maximum height of the dropdown. */
  maxHeight?: number;
  /** Placeholder to render in the button. */
  placeholder?: string;
  /** The empty state message to render. */
  emptyStateMessage?: string;
  /** Controls if the select is disabled. */
  isDisabled?: boolean;
  /** Controls if we should render the loading state. */
  isLoading?: boolean;
  /** Controls if we will try to load more items when they reach the loadingThreshold.  */
  hasMore?: boolean;
  /** Controls the label of the header and if the header is visible. */
  headerLabel?: string;
  /** Placeholder for the search bar. */
  searchPlaceholder?: string;
  /** The value for the search bar input, if this value is supplied we will render the search bar. */
  searchValue?: string;
  /** Specify a different layer id to tie the select to. */
  layerRootId?: string;
  /** Control where the placement of the select is. */
  placement?: Placement;
  /** Called when the search bar value is changed. */
  onSearchChange?: (value: string) => void;
  /** Called when we request to load more items. */
  onLoadMore?: () => Promise<void>;
  /** Called when the select is closed. */
  onSelectClosed?: () => void;
  /** Called when the select is opened. */
  onSelectOpen?: () => void;
}

/*
 * Component.
 */

export const Select: FC<SelectProps> = ({
  children,
  selectedValues = '',
  maxHeight,
  maxWidth,
  minHeight,
  placeholder = 'Select from options',
  emptyStateMessage,
  isDisabled,
  isLoading,
  hasMore,
  headerLabel,
  searchPlaceholder,
  searchValue,
  layerRootId,
  placement = 'bottom-start',
  onSearchChange,
  onLoadMore,
  onSelectClosed,
  onSelectOpen
}) => {
  const childrenToRender = useMemo(
    () =>
      _(renderChildrenSpecifiedComponents(children, ['SelectItem']))
        .compact()
        .value(),
    [children]
  );
  const isEmpty = childrenToRender.length === 0 && !hasMore && !isLoading;

  return (
    <DropdownCoordinator
      placement={placement}
      maxWidth={maxWidth}
      isDisabled={isDisabled}
      layerRootId={layerRootId}
      onDropdownClosed={onSelectClosed}
      onDropdownOpen={onSelectOpen}
      renderButton={(isDropdownOpen, isButtonDisabled) => (
        <DropdownButton
          isDisabled={isButtonDisabled}
          isActive={isDropdownOpen}
          value={selectedValues}
          maxWidth={maxWidth}
          placeholder={placeholder}
        />
      )}
      renderDropdown={() => (
        <Dropdown
          maxHeight={maxHeight}
          minHeight={minHeight}
          shouldUseItemsHeight
          isEmpty={isEmpty}
          renderEmptyState={() => <EmptyState message={emptyStateMessage} />}
          isLoading={isLoading}
          hasMore={hasMore}
          loadingThreshold={loadingThreshold}
          onLoadMore={onLoadMore}
        >
          {maybeRenderHeader(headerLabel, searchPlaceholder, searchValue, onSearchChange)}
          {children}
        </Dropdown>
      )}
    />
  );
};

/*
 * Helpers.
 */

function maybeRenderHeader(
  label?: string,
  searchPlaceholder?: string,
  searchValue?: string,
  onSearchChange?: (value: string) => void
) {
  if (!label)
    return null;
  return (
    <DropdownHeader
      searchPlaceholder={searchPlaceholder}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
    >
      {label}
    </DropdownHeader>
  );
}
