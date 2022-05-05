import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Icon} from '../../icon/icon';
import {Button} from '../button';

export default {
  title: 'Front UI Kit/Buttons',
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args}>Example Button</Button>;

export const ButtonPrimary = Template.bind({});
ButtonPrimary.args = {
  type: 'primary'
};

export const ButtonSecondary = Template.bind({});
ButtonSecondary.args = {
  type: 'secondary'
};

export const ButtonDanger = Template.bind({});
ButtonDanger.args = {
  type: 'primary-danger'
};

export const ButtonTertiary = Template.bind({});
ButtonTertiary.args = {
  type: 'tertiary'
};

const IconTemplate: ComponentStory<typeof Button> = args => (
  <Button {...args}>
    <Icon name="Close" />
  </Button>
);
export const IconButton = IconTemplate.bind({});
IconButton.args = {
  type: 'icon'
};
