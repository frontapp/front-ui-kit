/* eslint-disable react/jsx-props-no-spreading */
import React, {FC} from 'react';
import styled, {css} from 'styled-components';

import {Icon, IconName} from '../icon/icon';

/*
 * Props.
 */

interface DropdownItemIconProps {
  iconName: IconName;
  color?: string;
  position?: 'right' | 'left';
}

/*
 * Style.
 */

interface StyledDropdownIconWrapperDivProps {
  $position: 'left' | 'right';
}

const StyledDropdownIconWrapperDiv = styled.div<StyledDropdownIconWrapperDivProps>`
  ${p => {
    if (p.$position === 'left')
      return css`
        grid-area: left-content;
        margin-right: 8px;
      `;
    return css`
      grid-area: right-content;
      margin-left: 8px;
    `;
  }}
`;

/*
 * Component.
 */

export const DropdownItemIcon: FC<DropdownItemIconProps> = ({position = 'left', iconName, color}) => (
  <StyledDropdownIconWrapperDiv $position={position}>
    <Icon name={iconName} color={color} />
  </StyledDropdownIconWrapperDiv>
);
