/* eslint-disable react/no-array-index-key */
import {isArray} from 'lodash';
import {ellipsis} from 'polished';
import React, {FC} from 'react';
import styled, {css} from 'styled-components';

import {alphas, greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes} from '../../helpers/fontHelpers';
import {useMeasureElement} from '../../helpers/hookHelpers';
import {buildHoverParentClassName, hoverSelector} from '../../helpers/hoverHelpers';
import {Icon, IconName} from '../icon/icon';
import {OverflowWithCount} from '../overflowWithCount/overflowWithCount';
import {Pill} from '../pill/pill';

/*
 * Props.
 */

interface DropdownButtonProps {
  /** Content to render. If an array is passed in we will render the items in pill form. */
  value: string | ReadonlyArray<string>;
  /** Placeholder to render when no children is supplied. */
  placeholder?: string;
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** Whether the button is in error state. */
  isErred?: boolean;
  /** Whether the button is currently active. */
  isActive?: boolean;
  /** Icon to render on the left. If nothing is set, no icon will be rendered. */
  iconName?: IconName;
  /** The max width of the button. Default is 100%. */
  maxWidth?: number;
}

/*
 * Style.
 */

interface StyledDropdownButtonWrapperDivProps {
  $maxWidth?: number;
  $isActive?: boolean;
  $isDisabled?: boolean;
  $isErred?: boolean;
}

const StyledDropdownButtonWrapperDiv = styled.div<StyledDropdownButtonWrapperDivProps>`
  font-family: ${fonts.system};
  display: flex;
  flex-flow: row;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: ${fontSizes.medium};
  width: calc(100% - 16px);
  border: 2px solid transparent;
  min-height: 30px;

  ${p => css`
    max-width: ${p.$maxWidth ? `${p.$maxWidth}px` : 'unset'};
  `};

  ${p => addDropdownButtonWrapperStyles(p.$isActive, p.$isDisabled, p.$isErred)};
`;

function addDropdownButtonWrapperStyles(isActive?: boolean, isDisabled?: boolean, isErred?: boolean) {
  if (isErred)
    return css`
      background: ${palette.red[isActive ? 'shade20' : 'shade10']};

      &:hover {
        background: ${palette.red.shade20};
      }
    `;

  if (isDisabled)
    return css`
      background: white;
      border-color: ${greys.shade30};
    `;

  return css`
    background: ${greys[isActive ? 'shade30' : 'shade20']};
    
    &:hover {
      background: ${greys.shade30};
    }
  `;
}

interface StyledContentWrapperDivProps {
  $isDisabled?: boolean;
}

const StyledContentWrapperDiv = styled.div<StyledContentWrapperDivProps>`
  display: flex;
  flex-flow: row;
  flex: 1;
  overflow: hidden;
  place-content: center;

  ${p => p.$isDisabled && css`
    opacity: 0.5;
  `};
`;

const StyledIconWrapperDiv = styled.div`
  padding: 5px 2px 5px 8px;
`;

const StyledPlaceholderWrapperDiv = styled.div`
  ${ellipsis()};
  color: ${greys.shade50};
  cursor: default;

  ${hoverSelector} {
    color: ${greys.shade60};
  }
`;

const StyledChildrenWrapperDiv = styled.div`
  ${ellipsis()};
  color: ${greys.shade90};
  cursor: default;
  flex: 1;
  padding: 0 0 0 8px;
  line-height: 26px;
  height: 26px;
`;

const StyledPillsWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  gap: 4px;
  margin-left: -4px;
`;

const StyledChevronWrapperDiv = styled.div`
  display: flex;
  flex-flow: column;
  place-content: center;
  padding: 0 8px;
`;

/*
 * Component.
 */

export const DropdownButton: FC<DropdownButtonProps> = props => {
  const {maxWidth, value, iconName, isDisabled, isActive, isErred} = props;
  const [childrenContainerRef, {width}] = useMeasureElement();

  return (
    <StyledDropdownButtonWrapperDiv
      className={!isDisabled ? buildHoverParentClassName(isActive) : undefined}
      $maxWidth={maxWidth}
      $isActive={isActive}
      $isDisabled={isDisabled}
      $isErred={isErred}
    >
      <StyledContentWrapperDiv $isDisabled={isDisabled}>
        {maybeRenderIcon(iconName)}
        <StyledChildrenWrapperDiv ref={childrenContainerRef}>
          {maybeRenderPlaceholder(props)}
          {renderDropdownContent(value, width)}
        </StyledChildrenWrapperDiv>
      </StyledContentWrapperDiv>
      <StyledChevronWrapperDiv>
        <Icon name="ChevronDown" color={greys[isDisabled ? 'shade50' : 'shade70']} />
      </StyledChevronWrapperDiv>
    </StyledDropdownButtonWrapperDiv>
  );
};

/*
 * Helpers.
 */

function renderDropdownContent(value: string | ReadonlyArray<string>, childrenContainerWidth: number) {
  if (Array.isArray(value))
    return (
      <StyledPillsWrapperDiv>
        <OverflowWithCount<string>
          shouldRenderPartial={false}
          elements={value}
          elementRenderer={(element, index) => (
            <Pill key={`${index}-${element}`} colors={{backgroundColor: alphas.black30, textColor: greys.shade90}}>
              {element}
            </Pill>
          )}
          overflowContainerWidth={childrenContainerWidth}
        />
      </StyledPillsWrapperDiv>
    );
  return value;
}

function maybeRenderIcon(iconName?: IconName) {
  if (!iconName)
    return null;
  return (
    <StyledIconWrapperDiv>
      <Icon name={iconName} color={greys.shade50} />
    </StyledIconWrapperDiv>
  );
}

function maybeRenderPlaceholder(props: DropdownButtonProps) {
  const {value, placeholder} = props;
  if (!placeholder)
    return null;
  // If the value is a string and we have a value or the value is an array and it has items do not render placeholder.
  if ((typeof value === 'string' && value !== '') || (isArray(value) && value.length !== 0))
    return null;
  return (
    <StyledPlaceholderWrapperDiv>
      {placeholder}
    </StyledPlaceholderWrapperDiv>
  );
}
