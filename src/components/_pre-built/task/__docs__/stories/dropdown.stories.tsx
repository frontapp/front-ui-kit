import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {DropdownItem} from '../../../../../elements/dropdown/dropdownItem';
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

/*
 * Storybook.
 */

const ShowcaseTemplate: ComponentStory<typeof Task> = () => {
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
          label="Apply changes to feature"
        >
          <DropdownItem>View Task Details</DropdownItem>
          <DropdownItem>Close Task</DropdownItem>
        </Task>
      </StyledShowcaseDiv>
    </StyledWrapperDiv>
  );
};
export const Dropdown = ShowcaseTemplate.bind({});
