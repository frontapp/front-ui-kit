import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Button} from '../../button';
import {ButtonGroup} from '../../buttonGroup';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const Template: ComponentStory<typeof Button> = () => (
  <StyledCenteredDiv>
    <ButtonGroup>
      <Button type="secondary">Secondary</Button>
      <Button type="secondary-danger">Secondary Danger</Button>
      <Button type="primary">Primary</Button>
      <Button type="primary-danger">Primary Danger</Button>
      <Button type="tertiary">Tertiary</Button>
    </ButtonGroup>
  </StyledCenteredDiv>
);

export const Variants = Template.bind({});
