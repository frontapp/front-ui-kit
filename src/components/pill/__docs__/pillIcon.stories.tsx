/* eslint-disable @typescript-eslint/no-explicit-any */
import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Icon, IconName, icons} from '../../icon/icon';
import {Pill} from '../pill';
import {PillContent} from '../pillContent';
import {PillContentIcon} from '../pillContentIcon';

export default {
  title: 'Front UI Kit/Pill',
  component: Pill,
  argTypes: {
    iconName: {control: {type: 'select'}, options: Object.keys(icons), defaultValue: "Checkmark"},
    iconPosition: {control: {type: 'select'}, options: ['right', 'left'], defaultValue: "left"},
    children: {
      table: {
        disable: true
      }
    }
  }
} as ComponentMeta<typeof Pill>;

const IconTemplate: ComponentStory<typeof Pill & {iconName: IconName}> = args => (
  <Pill isSelected={args.isSelected} colors={args.colors} onClick={args.onClick}>
    <PillContent>Example Pill</PillContent>
    <PillContentIcon position={(args as any).iconPosition}>
      <Icon name={(args as any).iconName} />
    </PillContentIcon>
  </Pill>
);
export const PillWithIcon = IconTemplate.bind({});
