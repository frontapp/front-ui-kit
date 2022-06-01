import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Paragraph} from '../paragraph';

export default {
  title: 'Components/Paragraph',
  component: Paragraph
} as ComponentMeta<typeof Paragraph>;

const Template: ComponentStory<typeof Paragraph> = args => (
  <Paragraph {...args}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mattis lorem, id varius sem. Praesent commodo
    eu ex sit amet cursus. Sed condimentum tortor urna, ut dapibus odio vehicula a. Quisque nec odio lorem. In hac habitasse
    platea dictumst. Mauris dictum varius ultrices. Morbi sed lacus auctor, blandit enim ac, dignissim libero. Praesent a
    massa augue. Sed turpis dui, accumsan sed tristique in, tincidunt nec metus. In nec vehicula est. Maecenas venenatis
    tincidunt congue. Ut at fermentum urna. Sed vestibulum mattis dapibus.
  </Paragraph>
);

export const Basic = Template.bind({});
