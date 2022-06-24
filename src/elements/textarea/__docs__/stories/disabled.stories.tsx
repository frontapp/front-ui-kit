import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Textarea} from '../../textarea';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const StyledInputWrapperDiv = styled.div`
  width: 300px;
`;

const Template: ComponentStory<typeof Textarea> = () => {
  const [value, setValue] = useState('');
  return (
    <StyledCenteredDiv>
      <StyledInputWrapperDiv>
        <Textarea value={value} onChange={setValue} placeholder="Simple Textarea Example" isDisabled />
      </StyledInputWrapperDiv>
    </StyledCenteredDiv>
  );
};

export const Disabled = Template.bind({});
