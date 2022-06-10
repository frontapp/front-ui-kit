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
  /** Whether we should force hover state styles. */
  isActive?: boolean;
  /** Called when the user click on the button. */
  onClick: MouseEventHandler;
  /** Class name to allow custom styling of the icon button. */
  className?: string;
}

/*
 * Style.
 */

interface StyledIconButtonProps {
  $isDanger?: boolean;
  $isDisabled?: boolean;
  $isActive?: boolean;
}

const StyledIconButton = styled.button<StyledIconButtonProps>`
  background: transparent;
  border: none;
  padding: 7px;
  border-radius: 8px;

  ${p => addIconColorStyles(p.$isDanger, p.$isDisabled, p.$isActive)};
`;

function addIconColorStyles(isDanger?: boolean, isDisabled?: boolean, isActive?: boolean) {
  if (isDisabled)
    return css`
      color: ${greys.shade40};
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

export const IconButton: FC<IconButtonProps> = props => {
  const {children, isDanger, isDisabled, isActive, onClick, className} = props;
  return (
    <StyledIconButton className={className} $isDanger={isDanger} $isDisabled={isDisabled} $isActive={isActive} onClick={onClick}>
      {renderFirstIconOnly(children)}
    </StyledIconButton>
  );
};
