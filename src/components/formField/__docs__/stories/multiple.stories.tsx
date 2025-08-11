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
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const ref1 = createRef<HTMLInputElement>();
  const ref2 = createRef<HTMLInputElement>();
  const ref3 = createRef<HTMLInputElement>();
  return (
    <StyledFormFieldDiv>
      <FormField label="Name" ref={ref1}>
        <Input value={value1} onChange={(v) => setValue1(v)} />
      </FormField>
      <FormField label="Email" ref={ref2}>
        <Input value={value2} onChange={(v) => setValue2(v)} />
      </FormField>
      <FormField label="Company" ref={ref3}>
        <Input value={value3} onChange={(v) => setValue3(v)} />
      </FormField>
    </StyledFormFieldDiv>
  );
};

export const Multiple: StoryObj<typeof FormField> = {
  render: () => <Template />
};
