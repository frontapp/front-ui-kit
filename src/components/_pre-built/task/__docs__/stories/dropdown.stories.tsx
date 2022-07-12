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
  height: 150px;
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
          onClick={() => console.log('Task Clicked.')}
          label="Apply changes to feature"
          layerRootId="story--components-task--dropdown"
        >
          <DropdownItem>View Task Details</DropdownItem>
          <DropdownItem>Close Task</DropdownItem>
        </Task>
      </StyledShowcaseDiv>
    </StyledWrapperDiv>
  );
};
export const Dropdown = ShowcaseTemplate.bind({});
