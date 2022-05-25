import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';
import {Input} from '../../input/input';
import {FormField} from '../formField';

export default {
  title: 'Components/FormField',
  component: FormField
} as ComponentMeta<typeof FormField>;

const StyledFormDiv = styled.div`
  background: ${greys.white};
  padding: 16px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

const Template: ComponentStory<typeof FormField> = args => {
  const [value, setValue] = useState('');
  return (
    <StyledFormDiv>
      <FormField {...args}>
        <Input value={value} onChange={setValue} shouldFocus />
      </FormField>
    </StyledFormDiv>
  );
};

export const BasicInput = Template.bind({});
BasicInput.args = {
  label: "Example form field",
  hint: "This is an example hint."
};
