import React, {FC, MouseEventHandler} from 'react';
import styled from 'styled-components';

import {alphas} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {Button} from '../button/button';
import {Icon} from '../icon/icon';
import {Input} from '../input/input';

/*
 * Props.
 */

interface DropdownHeaderProps {
  /** The label to render for the header. */
  children: React.ReactNode;
  /** Placeholder for the search bar. */
  searchPlaceholder?: string;
  /** The value for the search bar input, if this value is supplied we will render the search bar. */
  searchValue?: string;
  /** If this function is supplied, a back button will be rendered. This is called when the back button is clicked. */
  onBackClick?: MouseEventHandler;
  /** Called when the search bar value is changed. */
  onSearchChange?: (value: string) => void;
}

/*
 * Style.
 */

const StyledDropdownHeaderWrapperDiv = styled.div`
  font-family: ${fonts.system};
  grid-area: header;
  display: flex;
  flex-flow: column;
  padding: 12px;
  gap: 10px;
  border-bottom: 1px solid ${alphas.black20};
`;

const StyledHeaderTopRowDiv = styled.div`
  display: flex;
  flex-flow: row;
`;

const StyledHeaderLabelDiv = styled.div`
  flex: 1;
  text-align: center;
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.medium};
  line-height: 16px;
`;

const StyledButtonWrapperDiv = styled.div`
  // Need to be negative to move into the padding of the dropdown a bit.
  margin: -6px 0 -8px -6px;
`;

const StyledSearchWrapperDiv = styled.div``;

/*
 * Component.
 */

export const DropdownHeader: FC<DropdownHeaderProps> = props => {
  const {children, searchPlaceholder, searchValue, onSearchChange, onBackClick} = props;
  return (
    <StyledDropdownHeaderWrapperDiv onClick={event => event.preventDefault()}>
      <StyledHeaderTopRowDiv>
        {maybeRenderBackButton(onBackClick)}
        <StyledHeaderLabelDiv>{children}</StyledHeaderLabelDiv>
      </StyledHeaderTopRowDiv>
      {maybeRenderSearchDropdown(searchValue, searchPlaceholder, onSearchChange)}
    </StyledDropdownHeaderWrapperDiv>
  );
};

/*
 * Helpers.
 */

function maybeRenderBackButton(onBackClick?: MouseEventHandler) {
  // We will not render the back button unless an event handler is supplied.
  if (!onBackClick)
    return null;
  return (
    <StyledButtonWrapperDiv>
      <Button
        type="icon"
        onClick={event => {
          onBackClick(event);
          // Mark the input as handled.
          event.preventDefault();
        }}
      >
        <Icon name="ChevronLeft" />
      </Button>
    </StyledButtonWrapperDiv>
  );
}

function maybeRenderSearchDropdown(
  searchValue?: string,
  placeholder?: string,
  onSearchChange?: (value: string) => void
) {
  // We will only render the dropdown if the value is supplied.
  if (typeof searchValue === 'undefined')
    return null;
  return (
    <StyledSearchWrapperDiv
      onClick={event => {
        // Mark the input as handled.
        event.preventDefault();
      }}
    >
      <Input
        iconName="Search"
        placeholder={placeholder}
        value={searchValue}
        onChange={val => {
          if (onSearchChange && typeof val !== 'undefined')
            onSearchChange(`${val}`);
        }}
      />
    </StyledSearchWrapperDiv>
  );
}
