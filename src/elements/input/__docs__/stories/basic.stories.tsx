import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Input} from '../../input';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const StyledInputWrapperDiv = styled.div`
  width: 300px;
`;

const Template: ComponentStory<typeof Input> = () => {
  const [value, setValue] = useState('');
  return (
    <StyledCenteredDiv>
      <StyledInputWrapperDiv>
        <Input value={value} onChange={setValue} placeholder="Simple Input Example" />
      </StyledInputWrapperDiv>
    </StyledCenteredDiv>
  );
};

export const Basic = Template.bind({});
