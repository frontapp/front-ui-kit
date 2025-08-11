import { StoryObj } from '@storybook/react';
import React, { createRef,useState } from 'react';
import styled from 'styled-components';

import { Input } from '../../../../elements/input/input';
import { greys } from '../../../../helpers/colorHelpers';
import { FormField } from '../../formField';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const StyledFormDiv = styled.div`
  background: ${greys.white};
  padding: 16px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

const StyledFormFieldDiv = styled.div`
  background: ${greys.white};
  padding: 16px;
  border-radius: 8px;
  max-width: 500px;
  width: 300px;
`;

const Template = () => {
  const [value, setValue] = useState('invalid@email');
  const ref = createRef<HTMLInputElement>();
  return (
    <StyledFormFieldDiv>
      <FormField label="Name" errorMessage="Please enter a valid email." ref={ref}>
        <Input value={value} onChange={(v) => setValue(v)} isErred />
      </FormField>
    </StyledFormFieldDiv>
  );
};

export const Erred: StoryObj<typeof FormField> = {
  render: () => <Template />
};
