import React, {FC, MouseEvent, MouseEventHandler} from 'react';
import styled, {css} from 'styled-components';

import {alphas, greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights, VisualSizesEnum} from '../../helpers/fontHelpers';
import {isComponentInChildren} from '../../helpers/renderHelpers';
import {makeSizeConstants} from '../../helpers/styleHelpers';
import {ButtonContent} from './buttonContent';
import {IconButton} from './iconButton';

/*
 * Constants.
 */

const lineHeights = makeSizeConstants(16, 16, 20);
const verticalPadding = makeSizeConstants(5, 7, 9);
const horizontalPadding = makeSizeConstants(12, 14);
const buttonFontSize = makeSizeConstants(fontSizes.small, fontSizes.medium, fontSizes.large);

/*
 * Props.
 */

export type ButtonTypes =
  'primary' |
  'secondary' |
  'tertiary' |
  'primary-danger' |
  'secondary-danger' |
  'icon' |
  'icon-danger';

interface ButtonProps {
  /** The type of button to render. */
  type?: ButtonTypes;
  /** Whether the button is disabled. If disabled the onClick will not fire. */
  isDisabled?: boolean;
  /** Content to render. If there is no ButtonContent specified, we will automatically wrap it for you. */
  children?: React.ReactNode;
  /** The size of the button. Note EXTRA_LARGE is not supported. */
  size?: VisualSizesEnum;
  /** Whether the button is currently active. */
  isActive?: boolean;
  /** Called when the user click on the button. */
  onClick?: MouseEventHandler;
  /** The color of the icon to be displayed. */
  iconColor?: string
}

/*
 * Style.
 */

const StyledButtonWrapperDiv = styled.div`
  display: inline-block;
`;

interface StyledButtonProps {
  $size: VisualSizesEnum;
  $type: Omit<ButtonTypes, 'icon' | 'icon-danger'>;
  $isActive?: boolean;
  $isDisabled?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: grid;
  grid-template-areas: "left-content content right-content";
  font-family: ${fonts.system};
  border-radius: 100px;
  box-sizing: border-box;
  font-weight: ${fontWeights.semibold};

  ${p => addButtonSizeStyles(p.$size)};
  ${p => addButtonTypeStyles(p.$type, p.$isDisabled, p.$isActive)};
`;

function addButtonSizeStyles(size: VisualSizesEnum) {
  return css`
    font-size: ${buttonFontSize[size]};
    line-height: ${lineHeights[size]}px;
    padding: ${verticalPadding[size]}px ${horizontalPadding[size]}px;
  `;
}

function addButtonTypeStyles(type: Omit<ButtonTypes, 'icon' | 'icon-danger'>, isDisabled?: boolean, isActive?: boolean) {
  if (isDisabled)
    return css`
      color: ${greys.shade70};
      border: 1px solid transparent;
      box-shadow: 0 1px 3px ${alphas.black10};
      background: ${greys.shade40};

      /* For tertiary we have slightly different styles. */
      ${type === 'tertiary' && css`
        color: ${greys.shade60};
        background: transparent;
        box-shadow: none;
      `}
    `;

  switch (type) {
    case 'primary':
      return css`
        ${addSharedPrimaryStyles()};
        background: ${palette.blue[isActive ? 'shade50' : 'shade40']};

        &:hover {
          background: ${palette.blue.shade50};
        }
      `;
    case 'primary-danger':
      return css`
        ${addSharedPrimaryStyles()};
        background: ${palette.red[isActive ? 'shade50' : 'shade40']};

        &:hover {
          background: ${palette.red.shade50};
        }
      `;
    case 'tertiary':
      return css`
        background: ${isActive ? alphas.gray10 : 'transparent'};
        border: 1px solid transparent;
        color: ${palette.blue.shade40};

        &:hover {
          background: ${alphas.gray10};
        }
      `;
    case 'secondary-danger':
      return css`
        ${addSharedSecondaryStyles(isActive)};
        color: ${palette.red.shade40};
      `;
    case 'secondary':
    default:
      return css`
        ${addSharedSecondaryStyles(isActive)};
        color: ${greys.shade80};
      `;
  }
}

function addSharedPrimaryStyles() {
  return css`
    color: ${greys.white};
    border: 1px solid transparent;
    box-shadow: 0 1px 3px ${alphas.black40};
  `;
}

function addSharedSecondaryStyles(isActive?: boolean) {
  return css`
    background: ${greys[isActive ? 'shade30' : 'white']};
    border: 1px solid ${alphas.black30};
    box-shadow: 0 1px 3px ${alphas.black10};

    &:hover {
      background: ${greys.shade30};
    }
  `;
}

/*
 * Component.
 */

export const Button: FC<ButtonProps> = props => {
  const {
    type = 'secondary',
    size = VisualSizesEnum.MEDIUM,
    children,
    isDisabled,
    isActive,
    onClick,
    iconColor
  } = props;

  // Wrap the onClick to check if it is disabled or not defined.
  const onButtonClick = (event: MouseEvent) => {
    if (isDisabled || !onClick)
      return;
    onClick(event);
  };
 
  // Check if we should be rendering an icon.
  if (type === 'icon' || type === 'icon-danger')
    return (
      <IconButton isDanger={type === 'icon-danger'} isDisabled={isDisabled} isActive={isActive} onClick={onButtonClick} iconColor={iconColor}>
        {children}
      </IconButton>
    );
  return (
    <StyledButtonWrapperDiv>
      <StyledButton $type={type} $size={size} $isDisabled={isDisabled} $isActive={isActive} onClick={onButtonClick}>
        {renderButtonChildren(children)}
      </StyledButton>
    </StyledButtonWrapperDiv>
  );
};

/*
 * Helpers.
 */

/** Renders the children and checks if we need to wrap the passed in children in the ButtonContent. */
function renderButtonChildren(children: React.ReactNode) {
  const shouldWrapInContent = !isComponentInChildren(children, 'ButtonContent');
  if (!shouldWrapInContent)
    return children;
  return <ButtonContent>{children}</ButtonContent>;
}
