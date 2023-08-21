import {ComponentStory} from '@storybook/react';
import React from 'react';

import {Avatar} from '../../avatar';

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  name: 'John Doe'
};
