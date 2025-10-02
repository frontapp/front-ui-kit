/* eslint-disable react/jsx-props-no-spreading */
import {FC} from 'react';
import styled from 'styled-components';

import {Avatar, AvatarProps} from '../../components/avatar/avatar';
import {VisualSizesEnum} from '../../helpers/fontHelpers';

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

export const DropdownItemAvatar: FC<AvatarProps> = (props) => (
  <StyledDropdownAvatarWrapperDiv>
    <Avatar {...props} size={props.size || VisualSizesEnum.MEDIUM} />
  </StyledDropdownAvatarWrapperDiv>
);
