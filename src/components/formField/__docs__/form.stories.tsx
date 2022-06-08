import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';
import {Input} from '../../input/input';
import {FormField} from '../formField';

// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default {
  title: 'Components/FormField'
} as ComponentMeta<typeof FormField>;

const StyledFormDiv = styled.div`
  background: ${greys.white};
  padding: 32px 16px 16px 16px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

const Template: ComponentStory<typeof FormField> = args => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const isEmailErred = email !== '' && !emailRegex.test(email);

  return (
    <StyledFormDiv>
      <FormField label="Your name">
        <Input value={name} onChange={setName} placeholder="John Smith" />
      </FormField>
      <FormField label="Your email" errorMessage={isEmailErred ? 'Please enter a valid email' : undefined}>
        <Input value={email} type="email" onChange={setEmail} placeholder="john.smith@example.com" />
      </FormField>
      <FormField label="Your phone">
        <Input value={phone} onChange={setPhone} placeholder="1-888-888-8888" />
      </FormField>
    </StyledFormDiv>
  );
};

export const Form = Template.bind({});
Form.parameters = {
  controls: {hideNoControlsWarning: true}
};
