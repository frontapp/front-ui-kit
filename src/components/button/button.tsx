import React, {FC, MouseEvent, MouseEventHandler} from 'react';
import styled, {css} from 'styled-components';

import {alphas, greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights, VisualSizesEnum} from '../../helpers/fontHelpers';
import {
  isComponentInChildren,
  renderChildrenIgnoreSpecifiedComponents,
  renderChildrenSpecifiedComponents
} from '../../helpers/renderHelpers';
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
const nonButtonContentChildren = ['ButtonContentIcon'];

/*
 * Props.
 */

export type ButtonTypes =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'primary-danger'
  | 'secondary-danger'
  | 'icon'
  | 'icon-danger';

interface ButtonProps {
  /** The type of button to render. */
  type?: ButtonTypes;
  /** The size of the button. Note EXTRA_LARGE is not supported. */
  size?: VisualSizesEnum;
  /** Whether the button is disabled. If disabled the onClick will not fire. */
  isDisabled?: boolean;
  /** Content to render. If there is no ButtonContent specified, we will automatically wrap it for you. */
  children?: React.ReactNode;
  /** Whether the button is currently active. */
  isActive?: boolean;
  /** Class name to allow custom styling of the button. */
  className?: string;
  /** The color of the icon to be displayed. */
  iconColor?: string;
  /** Called when the user click on the button. */
  onClick?: MouseEventHandler;
  /** Used for icon buttons in order to make them completely round. */
  isRounded?: boolean;
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
  $isRounded?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: grid;
  grid-template-areas: 'left-content content right-content';
  font-family: ${fonts.system};
  border-radius: ${(p) => (p.$isRounded ? '100px' : '6px')};
  box-sizing: border-box;
  font-weight: ${fontWeights.medium};

  ${(p) => addButtonSizeStyles(p.$size)};
  ${(p) => addButtonTypeStyles(p.$type, p.$isDisabled, p.$isActive)};
`;

function addButtonSizeStyles(size: VisualSizesEnum) {
  return css`
    font-size: ${buttonFontSize[size]};
    line-height: ${lineHeights[size]}px;
    padding: ${verticalPadding[size]}px ${horizontalPadding[size]}px;
  `;
}

function addButtonTypeStyles(
  type: Omit<ButtonTypes, 'icon' | 'icon-danger'>,
  isDisabled?: boolean,
  isActive?: boolean
) {
  if (isDisabled)
    switch (type) {
      case 'primary':
        return css`
          color: ${greys.white};
          border: 1px solid transparent;
          box-shadow: 0 1px 3px ${alphas.black10};
          background: ${palette.blue.shade30};
        `;
      case 'primary-danger':
        return css`
          color: ${greys.white};
          border: 1px solid transparent;
          box-shadow: 0 1px 3px ${alphas.black10};
          background: ${palette.red.shade30};
        `;
      case 'secondary':
        return css`
          color: ${greys.shade50};
          border: 1px solid ${alphas.black10};
          box-shadow: 0 1px 3px ${alphas.black10};
          background: ${greys.shade20};
        `;
      case 'secondary-danger':
        return css`
          color: ${palette.red.shade40};
          border: 1px solid ${palette.red.shade20};
          box-shadow: 0 1px 3px ${alphas.black10};
          background: ${palette.red.shade10};
        `;
      case 'tertiary':
        return css`
          color: ${palette.blue.shade30};
          background: transparent;
          border: 1px solid transparent;
          box-shadow: none;
        `;
      default:
        return css`
          color: ${greys.shade50};
          border: 1px solid ${alphas.black10};
          box-shadow: 0 1px 3px ${alphas.black10};
          background: ${greys.shade20};
        `;
    }

  switch (type) {
    case 'primary': {
      return css`
        ${addSharedPrimaryStyles()};
        background: ${palette.blue[isActive ? 'shade70' : 'shade60']};

        &:hover {
          background: ${palette.blue.shade80};
        }
      `;
    }
    case 'primary-danger': {
      return css`
        ${addSharedPrimaryStyles()};
        background: ${palette.red[isActive ? 'shade60' : 'shade50']};

        &:hover {
          background: ${palette.red.shade70};
        }
      `;
    }
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
        color: ${palette.red.shade50};
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
    background: ${isActive ? greys.shade30 : greys.white};
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

export const Button: FC<ButtonProps> = ({
  type = 'secondary',
  size = VisualSizesEnum.MEDIUM,
  children,
  isDisabled,
  isActive,
  onClick,
  className,
  iconColor,
  isRounded
}) => {
  // Wrap the onClick to check if it is disabled or not defined.
  const onButtonClick = (event: MouseEvent) => {
    if (isDisabled || !onClick) return;
    onClick(event);
  };

  // Check if we should be rendering an icon.
  if (type === 'icon' || type === 'icon-danger')
    return (
      <IconButton
        isDanger={type === 'icon-danger'}
        className={className}
        isDisabled={isDisabled}
        isActive={isActive}
        onClick={onButtonClick}
        iconColor={iconColor}
        isRounded={isRounded}>
        {children}
      </IconButton>
    );
  return (
    <StyledButtonWrapperDiv>
      <StyledButton
        className={className}
        $type={type}
        $size={size}
        $isDisabled={isDisabled}
        $isActive={isActive}
        $isRounded={Boolean(isRounded)}
        onClick={onButtonClick}>
        {renderChildrenSpecifiedComponents(children, nonButtonContentChildren)}
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
  if (!shouldWrapInContent) return children;
  return (
    <ButtonContent>
      {renderChildrenIgnoreSpecifiedComponents(children, nonButtonContentChildren)}
    </ButtonContent>
  );
}
