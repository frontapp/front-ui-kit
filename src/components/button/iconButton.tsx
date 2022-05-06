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
  /** Called when the user click on the button. */
  onClick: MouseEventHandler;
}

/*
 * Style.
 */

interface StyledIconButtonProps {
  $isDanger?: boolean;
  $isDisabled?: boolean;
}

const StyledIconButton = styled.button<StyledIconButtonProps>`
  background: transparent;
  border: none;
  padding: 7px;
  border-radius: 8px;

  ${p => addIconColorStyles(p.$isDanger, p.$isDisabled)};
`;

function addIconColorStyles(isDanger?: boolean, isDisabled?: boolean) {
  if (isDisabled)
    return css`
      color: ${greys.shade40};
    `;
  if (isDanger)
    return css`
      color: ${palette.red.shade40};

      &:hover {
        color: ${palette.red.shade50};
        background: ${alphas.gray20};
      }
    `;
  return css`
    color: ${greys.shade70};

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
  const {children, isDanger, isDisabled, onClick} = props;
  return (
    <StyledIconButton $isDanger={isDanger} $isDisabled={isDisabled} onClick={onClick}>
      {renderFirstIconOnly(children)}
    </StyledIconButton>
  );
};
