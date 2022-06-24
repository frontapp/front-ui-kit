import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Icon} from '../../../../elements/icon/icon';
import {Button} from '../../button';
import {ButtonContentIcon} from '../../buttonContentIcon';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const Template: ComponentStory<typeof Button> = () => (
  <StyledCenteredDiv>
    <Button>
      Example
      <ButtonContentIcon>
        <Icon name="Calendar" />
      </ButtonContentIcon>
    </Button>
  </StyledCenteredDiv>
);

export const IconContentBasic = Template.bind({});
