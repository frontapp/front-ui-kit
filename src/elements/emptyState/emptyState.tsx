import React, {FC} from 'react';
import styled, {css} from 'styled-components';

import {Button} from '../../components/button/button';
import {greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes} from '../../helpers/fontHelpers';
import {Icon} from '../icon/icon';

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
          <Icon name="Search" size={40} color={greys.shade50} />
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
