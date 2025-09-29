import {StoryObj} from '@storybook/react';
import React, {createRef, useState} from 'react';
import styled from 'styled-components';

import {Input} from '../../input';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  width: 300px;
`;

const Template = () => {
  const [value, setValue] = useState('');
  const ref = createRef<HTMLInputElement>();
  return (
    <StyledCenteredDiv>
      <Input
        value={value}
        onChange={(v) => setValue(String(v))}
        isErred
        ref={ref}
        placeholder="Erred Input Example"
      />
    </StyledCenteredDiv>
  );
};

export const Erred: StoryObj<typeof Input> = {
  render: () => <Template />
};
