import {StoryObj} from '@storybook/react';
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

const StyledTextareaDiv = styled.div`
  width: 300px;
`;

const Template = () => {
  const [value, setValue] = useState('');
  return (
    <StyledTextareaDiv>
      <Textarea value={value} onChange={setValue} isErred />
    </StyledTextareaDiv>
  );
};

export const Erred: StoryObj<typeof Textarea> = {
  render: () => <Template />
};
