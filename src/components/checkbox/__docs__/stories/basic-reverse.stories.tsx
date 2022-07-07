import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Checkbox} from '../../checkbox';

const StyledWrapperDiv = styled.div`
  max-width: 400px;
`;

const Template: ComponentStory<typeof Checkbox> = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <StyledWrapperDiv>
      <Checkbox isChecked={isChecked} onChange={setIsChecked} labelSide="left">
        Example Checkbox
      </Checkbox>
    </StyledWrapperDiv>
  );
};

export const BasicReverse = Template.bind({});
