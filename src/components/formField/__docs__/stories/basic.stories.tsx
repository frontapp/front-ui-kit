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
  const [value, setValue] = useState('');
  return (
    <StyledFormFieldDiv>
      <FormField label="Name">
        <Input value={value} onChange={(event) => setValue(event.target.value)} />
      </FormField>
    </StyledFormFieldDiv>
  );
};

export const Basic: StoryObj<typeof FormField> = {
  render: () => <Template />
};
