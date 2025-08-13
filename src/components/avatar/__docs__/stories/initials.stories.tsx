import {StoryObj} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {VisualSizesEnum} from '../../../../helpers/fontHelpers';
import {Avatar} from '../../avatar';

const StyledAvatarWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  gap: 8px;
`;

export const Initials: StoryObj<typeof Avatar> = {
  render: () => (
    <StyledAvatarWrapperDiv>
      <Avatar name="John Doe" size={VisualSizesEnum.EXTRA_LARGE} />
      <Avatar name="Ronnie" size={VisualSizesEnum.EXTRA_LARGE} />
      <Avatar name="Jake P1" size={VisualSizesEnum.EXTRA_LARGE} />
    </StyledAvatarWrapperDiv>
  )
};
