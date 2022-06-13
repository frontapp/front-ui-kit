import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC} from 'react';
import styled from 'styled-components';

import {IconName, icons} from '../../../components/icon/icon';
import {greys} from '../../../helpers/colorHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Task} from '../task';

/*
 * Props.
 */

interface TaskWithIconProps {
  icon: IconName;
}

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

const TaskWithIconComponent: FC<TaskWithIconProps> = props => (
  <DefaultStyleProvider>
    <StyledShowcaseDiv>
      <Task
        type="icon"
        icon={props.icon || 'AttachmentCalendar'}
        label="Apply changes to feature"
      />
    </StyledShowcaseDiv>
  </DefaultStyleProvider>
);

/*
 * Storybook.
 */

export default {
  title: 'Misc/Task',
  component: TaskWithIconComponent,
  argTypes: {
    icon: {control: 'radio', options: Object.keys(icons)}
  }
} as ComponentMeta<typeof TaskWithIconComponent>;

const ShowcaseTemplate: ComponentStory<typeof TaskWithIconComponent> = (props: TaskWithIconProps) => <TaskWithIconComponent icon={props.icon} />;
export const TaskWithIcon = ShowcaseTemplate.bind({});
