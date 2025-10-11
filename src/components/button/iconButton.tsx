import React, {FC, MouseEventHandler} from 'react';
import styled, {css} from 'styled-components';

import {alphas, greys, palette, PaletteColorsEnum} from '../../helpers/colorHelpers';
import {renderFirstIconOnly} from '../../helpers/renderHelpers';

/*
 * Props.
 */

interface IconButtonProps {
  /** Children to render. We only support 1 icon for this button and will ignore all other icons. */
  children: React.ReactNode;
  /** Whether we should render the icon in red. */
  isDanger?: boolean;
  /** Whether the button is disabled. If disabled the onClick will not fire. */
  isDisabled?: boolean;
  /** Whether we should force hover state styles. */
  isActive?: boolean;
  /** Called when the user click on the button. */
  onClick: MouseEventHandler;
  /** Class name to allow custom styling of the icon button. */
  className?: string;
  /** The color of the icon to be displayed. */
  iconColor?: string;
  /** Make the button completely round. */
  isRounded?: boolean;
  /** Custom color from the palette to use for the icon button. Overrides the default colors. */
  color?: PaletteColorsEnum;
  /** Custom border radius for the icon button. Defaults to 8px or 99999px if isRounded. */
  borderRadius?: string | number;
}

/*
 * Style.
 */

interface StyledIconButtonProps {
  $isDanger?: boolean;
  $isDisabled?: boolean;
  $isActive?: boolean;
  $iconColor?: string;
  $isRounded?: boolean;
  $color?: PaletteColorsEnum;
  $borderRadius?: string | number;
}

const StyledIconButton = styled.button<StyledIconButtonProps>`
  background: transparent;
  border: none;
  padding: 7px;
  border-radius: ${(p) => p.$borderRadius || (p.$isRounded ? '99999px' : '8px')};

  ${(p) => addIconColorStyles(p.$isDanger, p.$isDisabled, p.$isActive, p.$iconColor, p.$color)};
`;

function addIconColorStyles(
  isDanger?: boolean,
  isDisabled?: boolean,
  isActive?: boolean,
  iconColor?: string,
  customColor?: PaletteColorsEnum
) {
  if (isDisabled)
    return css`
      color: ${greys.shade40};
    `;

  // Handle custom color with early return
  if (customColor)
    return css`
      color: ${palette[customColor][isActive ? 'shade50' : 'shade40']};
      background: ${isActive ? alphas.gray20 : 'unset'};

      &:hover {
        color: ${palette[customColor].shade50};
        background: ${alphas.gray20};
      }
    `;

  if (isDanger)
    return css`
      color: ${palette.red[isActive ? 'shade50' : 'shade40']};
      background: ${isActive ? alphas.gray20 : 'unset'};

      &:hover {
        color: ${palette.red.shade50};
        background: ${alphas.gray20};
      }
    `;

  if (iconColor)
    return css`
      color: ${iconColor};
      background: ${isActive ? alphas.gray20 : 'unset'};

      &:hover {
        background: ${alphas.gray20};
      }
    `;

  return css`
    color: ${greys[isActive ? 'shade80' : 'shade70']};
    background: ${isActive ? alphas.gray20 : 'unset'};

    &:hover {
      color: ${greys.shade80};
      background: ${alphas.gray20};
    }
  `;
}

/*
 * Component.
 */

export const IconButton: FC<IconButtonProps> = (props) => {
  const {
    children,
    isDanger,
    isDisabled,
    isActive,
    onClick,
    className,
    iconColor,
    isRounded,
    color,
    borderRadius
  } = props;

  return (
    <StyledIconButton
      className={className}
      $isDanger={isDanger}
      $isDisabled={isDisabled}
      $isActive={isActive}
      $isRounded={Boolean(isRounded)}
      $color={color}
      $borderRadius={borderRadius}
      onClick={onClick}
      $iconColor={iconColor}>
      {renderFirstIconOnly(children)}
    </StyledIconButton>
  );
};
