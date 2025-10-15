import React, {FC, MouseEventHandler} from 'react';
import styled, {css} from 'styled-components';

import {alphas, greys, palette} from '../../helpers/colorHelpers';
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
  /** Whether we should force active state styles. */
  isActive?: boolean;
  /** Called when the user click on the button. */
  onClick: MouseEventHandler;
  /** Class name to allow custom styling of the icon button. */
  className?: string;
  /** The color of the icon to be displayed. */
  iconColor?: string;
  /** Make the button completely round. */
  isRounded?: boolean;
  /** Forces the button to display in its hover state. */
  isHovered?: boolean;
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
  $isHovered?: boolean;
}

const StyledIconButton = styled.button<StyledIconButtonProps>`
  background: transparent;
  border: none;
  padding: 7px;
  border-radius: ${(p) => (p.$isRounded ? '8px' : '99999px')};

  ${(p) => addIconColorStyles(p.$isDanger, p.$isDisabled, p.$isActive, p.$iconColor, p.$isHovered)};
`;

function addIconColorStyles(
  isDanger?: boolean,
  isDisabled?: boolean,
  isActive?: boolean,
  iconColor?: string,
  isHovered?: boolean
) {
  if (isDisabled)
    return css`
      color: ${greys.shade40};
    `;
  if (isDanger)
    return css`
      color: ${isHovered ? palette.red.shade50 : palette.red[isActive ? 'shade50' : 'shade40']};
      background: ${isHovered || isActive ? alphas.gray20 : 'unset'};

      &:hover {
        color: ${palette.red.shade50};
        background: ${alphas.gray20};
      }
    `;

  if (iconColor)
    return css`
      color: ${iconColor};
      background: ${isHovered || isActive ? alphas.gray20 : 'unset'};

      &:hover {
        background: ${alphas.gray20};
      }
    `;

  return css`
    color: ${isHovered ? greys.shade80 : greys[isActive ? 'shade80' : 'shade70']};
    background: ${isHovered || isActive ? alphas.gray20 : 'unset'};

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
  const {children, isDanger, isDisabled, isActive, onClick, className, iconColor, isRounded, isHovered} =
    props;

  return (
    <StyledIconButton
      className={className}
      $isDanger={isDanger}
      $isDisabled={isDisabled}
      $isActive={isActive}
      $isRounded={Boolean(isRounded)}
      $isHovered={Boolean(isHovered)}
      onClick={onClick}
      $iconColor={iconColor}>
      {renderFirstIconOnly(children)}
    </StyledIconButton>
  );
};
