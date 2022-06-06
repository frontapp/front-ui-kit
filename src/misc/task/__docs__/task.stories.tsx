import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Task} from '../task';

export default {
  title: 'Misc/Task',
  component: Task
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = args => <Task {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: 'Task Label'
};
