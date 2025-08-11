import {StoryObj} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Task} from '../../task';

/*
 * Style.
 */

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const StyledShowcaseDiv = styled.div`
  border-radius: 8px;
  padding: 10px;
  width: 300px;
`;

const Template = () => {
  const [isChecked, setIsChecked] = useState(false);
  const onToggleCheckbox = (checked: boolean) => {
    setIsChecked(checked);
  };
  return (
    <StyledWrapperDiv>
      <StyledShowcaseDiv>
        <Task
          type="checkbox"
          isChecked={isChecked}
          onChange={onToggleCheckbox}
          onClick={() => console.log('Clicked Task')}
          label="Apply changes to feature"
        />
      </StyledShowcaseDiv>
    </StyledWrapperDiv>
  );
};

/*
 * Storybook.
 */

export const Checkbox: StoryObj<typeof Task> = {
  render: () => <Template />
};
