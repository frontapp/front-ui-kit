import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {DropdownItem} from '../../../components/dropdown/dropdownItem';
import {greys} from '../../../helpers/colorHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Task} from '../task';

/*
 * Style.
 */

const StyledShowcaseDiv = styled.div`
  background: ${greys.shade50};
  border-radius: 8px;
  padding: 16px;
  width: 200px;
`;

/*
 * Component.
 */

const TaskWithDropdownComponent: FC = props => {
  const [isChecked, setIsChecked] = useState(false);
  const onToggleCheckbox = (checked: boolean) => {
    setIsChecked(checked);
  };
  return (
    <DefaultStyleProvider>
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
    </DefaultStyleProvider>
  );
};

/*
 * Storybook.
 */

export default {
  title: 'Misc/Task',
  component: TaskWithDropdownComponent
} as ComponentMeta<typeof TaskWithDropdownComponent>;

const ShowcaseTemplate: ComponentStory<typeof TaskWithDropdownComponent> = () => <TaskWithDropdownComponent />;
export const TaskWithDropdown = ShowcaseTemplate.bind({});
TaskWithDropdown.parameters = {
  controls: {hideNoControlsWarning: true}
};
