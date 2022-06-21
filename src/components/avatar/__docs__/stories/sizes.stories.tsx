import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {VisualSizesEnum} from '../../../../helpers/fontHelpers';
import {Avatar} from '../../avatar';

const StyledAvatarWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  gap: 8px;
`;

const Template: ComponentStory<typeof Avatar> = () => (
  <StyledAvatarWrapperDiv>
    <Avatar name="Doug" imgSrc="https://picsum.photos/id/1062/200/200" size={VisualSizesEnum.SMALL} />
    <Avatar name="Doug" imgSrc="https://picsum.photos/id/1062/200/200" size={VisualSizesEnum.MEDIUM} />
    <Avatar name="Doug" imgSrc="https://picsum.photos/id/1062/200/200" size={VisualSizesEnum.LARGE} />
    <Avatar name="Doug" imgSrc="https://picsum.photos/id/1062/200/200" size={VisualSizesEnum.EXTRA_LARGE} />
  </StyledAvatarWrapperDiv>
);

export const Sizes = Template.bind({});
