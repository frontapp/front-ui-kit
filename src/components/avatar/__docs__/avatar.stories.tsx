import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {VisualSizesEnum} from '../../../helpers/fontHelpers';
import {Avatar} from '../avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = args => <Avatar {...args} />;

export const InitialsAvatar = Template.bind({});
InitialsAvatar.args = {
  name: "John Doe"
};

export const ImageAvatar = Template.bind({});
ImageAvatar.args = {
  name: "Doug the Pug",
  // Example image supplied by: https://picsum.photos/
  imgSrc: "https://picsum.photos/id/1062/200/200",
  size: VisualSizesEnum.EXTRA_LARGE
};
