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
  shouldForceHoverState?: boolean;
  /** Called when the user click on the button. */
  onClick: MouseEventHandler;
}

/*
 * Style.
 */

interface StyledIconButtonProps {
  $isDanger?: boolean;
  $isDisabled?: boolean;
  $shouldForceHoverState?: boolean;
}

const StyledIconButton = styled.button<StyledIconButtonProps>`
  background: transparent;
  border: none;
  padding: 7px;
  border-radius: 8px;

  ${p => addIconColorStyles(p.$isDanger, p.$isDisabled, p.$shouldForceHoverState)};
`;

function addIconColorStyles(isDanger?: boolean, isDisabled?: boolean, shouldForceHoverState?: boolean) {
  if (isDisabled)
    return css`
      color: ${greys.shade40};
    `;
  if (isDanger)
    return css`
      color: ${palette.red[shouldForceHoverState ? 'shade50' : 'shade40']};
      background: ${shouldForceHoverState ? alphas.gray20 : 'unset'};

      &:hover {
        color: ${palette.red.shade50};
        background: ${alphas.gray20};
      }
    `;
  return css`
    color: ${greys[shouldForceHoverState ? 'shade80' : 'shade70']};
    background: ${shouldForceHoverState ? alphas.gray20 : 'unset'};

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
  const {children, isDanger, isDisabled, shouldForceHoverState, onClick} = props;
  return (
    <StyledIconButton $isDanger={isDanger} $isDisabled={isDisabled} $shouldForceHoverState={shouldForceHoverState} onClick={onClick}>
      {renderFirstIconOnly(children)}
    </StyledIconButton>
  );
};
