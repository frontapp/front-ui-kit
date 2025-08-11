import { StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { VisualSizesEnum } from '../../../../helpers/fontHelpers';
import { Avatar } from '../../avatar';

const StyledAvatarWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  gap: 8px;
`;

export const Sizes: StoryObj<typeof Avatar> = {
  render: () => (
    <StyledAvatarWrapperDiv>
      <Avatar name="Doug" imgSrc="https://picsum.photos/id/1062/200/200" size={VisualSizesEnum.SMALL} />
      <Avatar name="Doug" imgSrc="https://picsum.photos/id/1062/200/200" size={VisualSizesEnum.MEDIUM} />
      <Avatar name="Doug" imgSrc="https://picsum.photos/id/1062/200/200" size={VisualSizesEnum.LARGE} />
      <Avatar name="Doug" imgSrc="https://picsum.photos/id/1062/200/200" size={VisualSizesEnum.EXTRA_LARGE} />
    </StyledAvatarWrapperDiv>
  ),
};
