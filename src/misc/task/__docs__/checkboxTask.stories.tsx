import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Task} from '../task';

/*
 * Style.
 */

const StyledShowcaseDiv = styled.div`
  border-radius: 8px;
  padding: 10px;
  width: 300px;
`;

/*
 * Component.
 */

const TaskWithCheckboxComponent: FC = props => {
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
        />
      </StyledShowcaseDiv>
    </DefaultStyleProvider>
  );
};

/*
 * Storybook.
 */

export default {
  title: 'Misc/Task',
  component: TaskWithCheckboxComponent
} as ComponentMeta<typeof TaskWithCheckboxComponent>;

const ShowcaseTemplate: ComponentStory<typeof TaskWithCheckboxComponent> = () => <TaskWithCheckboxComponent />;
export const TaskWithCheckbox = ShowcaseTemplate.bind({});
TaskWithCheckbox.parameters = {
  controls: {hideNoControlsWarning: true}
};
