import {ellipsis} from 'polished';
import React, {FC} from 'react';
import styled, {css} from 'styled-components';

import {greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes} from '../../helpers/fontHelpers';
import {buildHoverParentClassName, hoverSelector} from '../../helpers/hoverHelpers';
import {Icon, IconName} from '../icon/icon';

/*
 * Props.
 */

interface DropdownButtonProps {
  /** Content to render. */
  children: string;
  /** Placeholder to render when no children is supplied. */
  placeholder?: string;
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** Whether we should force hover state styles. */
  shouldForceHoverState?: boolean;
  /** Icon to render on the right */
  iconName?: IconName;
  /** The max width of the button. Default is 100%. */
  maxWidth?: number;
}

/*
 * Style.
 */

interface StyledDropdownButtonWrapperDivProps {
  $maxWidth?: number;
  $shouldForceHoverState?: boolean;
  $isDisabled?: boolean;
}

const StyledDropdownButtonWrapperDiv = styled.div<StyledDropdownButtonWrapperDivProps>`
  font-family: ${fonts.system};
  display: flex;
  flex-flow: row;
  padding: 4.75px 8px;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: ${fontSizes.medium};
  width: calc(100% - 16px);
  border: 2px solid transparent;

  ${p => css`
    background: ${greys[p.$shouldForceHoverState ? 'shade30' : 'shade20']};
    max-width: ${p.$maxWidth ? `${p.$maxWidth}px` : 'unset'};
  `};

  ${p => addDropdownButtonWrapperStyles(p.$isDisabled)};
`;

function addDropdownButtonWrapperStyles(isDisabled?: boolean) {
  if (isDisabled)
    return css`
      background: white;
      border-color: ${greys.shade30};
    `;

  return css`
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

  ${p => p.$isDisabled && css`
    opacity: 0.5;
  `};
`;

const StyledIconWrapperDiv = styled.div`
  margin-right: 8px;
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
`;

/*
 * Component.
 */

export const DropdownButton: FC<DropdownButtonProps> = props => {
  const {maxWidth, children, iconName, isDisabled, shouldForceHoverState} = props;
  return (
    <StyledDropdownButtonWrapperDiv
      className={!isDisabled ? buildHoverParentClassName(shouldForceHoverState) : undefined}
      $maxWidth={maxWidth}
      $shouldForceHoverState={shouldForceHoverState}
      $isDisabled={isDisabled}
    >
      <StyledContentWrapperDiv $isDisabled={isDisabled}>
        {maybeRenderIcon(iconName)}
        {maybeRenderPlaceholder(props)}
        <StyledChildrenWrapperDiv>
          {children}
        </StyledChildrenWrapperDiv>
      </StyledContentWrapperDiv>
      <Icon name="ChevronDown" color={greys[isDisabled ? 'shade50' : 'shade70']} />
    </StyledDropdownButtonWrapperDiv>
  );
};

/*
 * Helpers.
 */

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
  const {children, placeholder} = props;
  if (children || !placeholder)
    return null;
  return (
    <StyledPlaceholderWrapperDiv>
      {placeholder}
    </StyledPlaceholderWrapperDiv>
  );
}
