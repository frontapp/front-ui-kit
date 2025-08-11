import {StoryObj} from '@storybook/react';
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

const Template = () => {
  const [value, setValue] = useState('');
  return (
    <StyledInputWrapperDiv>
      <Input value={value} onChange={(event) => setValue(event.target.value)} />
    </StyledInputWrapperDiv>
  );
};

export const Basic: StoryObj<typeof Input> = {
  render: () => <Template />
};
