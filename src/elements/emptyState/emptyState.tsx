import React, {FC} from 'react';
import styled, {css} from 'styled-components';

import {Button} from '../../components/button/button';
import {greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes} from '../../helpers/fontHelpers';

/*
 * Constants.
 */

const DefaultMessage = 'No results';

/*
 * Props.
 */

interface EmptyStateProps {
  /** The message to render for the empty state. */
  message?: string;
  /** Text for the button to render, required to render a button.  */
  buttonText?: string;
  /** Handler when the button is clicked, required to render a button. */
  onButtonClick?: () => void;
}

/*
 * Style.
 */

const StyledEmptyStateWrapperDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

interface StyledContentWrapperDivProps {
  $hasVisibleButton: boolean;
}

const StyledContentWrapperDiv = styled.div<StyledContentWrapperDivProps>`
  font-family: ${fonts.system};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 10px;

  ${(p) => css`
    height: ${p.$hasVisibleButton ? '140px' : '97px'};
  `};
`;

const StyledSearchIconWrapperDiv = styled.div`
  background: ${greys.shade30};
  border-radius: 50%;
  width: 70px;
  height: 70px;
  flex: 0 0 70px;
  margin: auto;
  display: grid;
  place-items: center;
`;

const StyledSearchTextDiv = styled.div`
  flex: 1;
  text-align: center;
  color: ${greys.shade70};
  font-size: ${fontSizes.medium};
`;

const StyledButtonWrapperDiv = styled.div`
  display: grid;
  place-content: center;
`;

/*
 * Component.
 */

export const EmptyState: FC<EmptyStateProps> = ({message = DefaultMessage, buttonText, onButtonClick}) => {
  const hasVisibleButton = Boolean(buttonText && onButtonClick);

  return (
    <StyledEmptyStateWrapperDiv>
      <StyledContentWrapperDiv $hasVisibleButton={hasVisibleButton}>
        <StyledSearchIconWrapperDiv>
          <svg
            width="40"
            height="40"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            style={{color: greys.shade50}}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.00244 7.00299C3.00244 4.79385 4.7933 3.00299 7.00244 3.00299C9.21158 3.00299 
              11.0024 4.79385 11.0024 7.00299C11.0024 9.21213 9.21158 11.003 7.00244 11.003C4.7933 
              11.003 3.00244 9.21213 3.00244 7.00299ZM7.00244 2.00299C4.24102 2.00299 2.00244 
              4.24157 2.00244 7.00299C2.00244 9.76441 4.24102 12.003 7.00244 12.003C8.20308 12.003 
              9.30487 11.5798 10.1668 10.8745L13.1489 13.8565C13.3442 14.0518 13.6607 14.0518 
              13.856 13.8565C14.0513 13.6613 14.0513 13.3447 13.856 13.1494L10.8739 10.1674C11.5793 
              9.30542 12.0024 8.20363 12.0024 7.00299C12.0024 4.24157 9.76387 2.00299 7.00244 2.00299Z"
            />
          </svg>
        </StyledSearchIconWrapperDiv>
        <StyledSearchTextDiv>{message}</StyledSearchTextDiv>
        {maybeRenderButton(buttonText, onButtonClick)}
      </StyledContentWrapperDiv>
    </StyledEmptyStateWrapperDiv>
  );
};

/*
 * Helpers.
 */

function maybeRenderButton(buttonText?: string, onButtonClick?: () => void) {
  if (!buttonText || !onButtonClick) return null;
  return (
    <StyledButtonWrapperDiv>
      <Button type="tertiary" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </StyledButtonWrapperDiv>
  );
}
