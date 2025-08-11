import {StoryObj} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Input} from '../../../../elements/input/input';
import {greys} from '../../../../helpers/colorHelpers';
import {FormField} from '../../formField';

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
  return (
    <StyledFormFieldDiv>
      <FormField label="Name">
        <Input value={value1} onChange={(event) => setValue1(event.target.value)} />
      </FormField>
      <FormField label="Email">
        <Input value={value2} onChange={(event) => setValue2(event.target.value)} />
      </FormField>
      <FormField label="Company">
        <Input value={value3} onChange={(event) => setValue3(event.target.value)} />
      </FormField>
    </StyledFormFieldDiv>
  );
};

export const Multiple: StoryObj<typeof FormField> = {
  render: () => <Template />
};
