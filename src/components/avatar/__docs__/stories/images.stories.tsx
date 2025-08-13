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

export const Images: StoryObj<typeof Avatar> = {
  render: () => (
    <StyledAvatarWrapperDiv>
      <Avatar name="John" imgSrc="https://picsum.photos/id/1005/200/200" size={VisualSizesEnum.EXTRA_LARGE} />
      <Avatar name="John" imgSrc="https://picsum.photos/id/177/200/200" size={VisualSizesEnum.EXTRA_LARGE} />
      <Avatar name="John" imgSrc="https://picsum.photos/id/248/200/200" size={VisualSizesEnum.EXTRA_LARGE} />
    </StyledAvatarWrapperDiv>
  )
};
