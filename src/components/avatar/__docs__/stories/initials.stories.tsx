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
    <Avatar name="John Doe" size={VisualSizesEnum.EXTRA_LARGE} />
    <Avatar name="Ronnie" size={VisualSizesEnum.EXTRA_LARGE} />
    <Avatar name="Jake P1" size={VisualSizesEnum.EXTRA_LARGE} />
  </StyledAvatarWrapperDiv>
);

export const Initials = Template.bind({});
