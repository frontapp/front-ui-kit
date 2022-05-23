/* eslint-disable react/jsx-props-no-spreading */
import React, {FC} from 'react';
import styled from 'styled-components';

import {VisualSizesEnum} from '../../helpers/fontHelpers';
import {Avatar, AvatarProps} from '../avatar/avatar';

/*
 * Style.
 */

const StyledDropdownAvatarWrapperDiv = styled.div`
  grid-area: left-content;
  margin-right: 12px;
`;

/*
 * Component.
 */

export const DropdownItemAvatar: FC<AvatarProps> = props => (
  <StyledDropdownAvatarWrapperDiv>
    <Avatar {...props} size={props.size || VisualSizesEnum.MEDIUM} />
  </StyledDropdownAvatarWrapperDiv>
);
