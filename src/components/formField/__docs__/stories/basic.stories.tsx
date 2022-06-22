import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {greys} from '../../../../helpers/colorHelpers';
import {Input} from '../../../input/input';
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

const Template: ComponentStory<typeof FormField> = args => {
  const [value, setValue] = useState('');
  return (
    <StyledWrapperDiv>
      <StyledFormDiv>
        <FormField {...args}>
          <Input value={value} onChange={setValue} />
        </FormField>
      </StyledFormDiv>
    </StyledWrapperDiv>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  label: "Example form field",
  hint: "This is an example hint."
};
