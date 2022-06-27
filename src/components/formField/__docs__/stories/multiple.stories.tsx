import {ComponentStory} from '@storybook/react';
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

const Template: ComponentStory<typeof FormField> = () => {
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  return (
    <StyledWrapperDiv>
      <StyledFormDiv>
        <FormField label="Form Field 1">
          <Input value={value} onChange={setValue} />
        </FormField>
        <FormField label="Form Field 2">
          <Input value={value1} onChange={setValue1} />
        </FormField>
        <FormField label="Form Field 3">
          <Input value={value2} onChange={setValue2} />
        </FormField>
      </StyledFormDiv>
    </StyledWrapperDiv>
  );
};

export const Multiple = Template.bind({});
