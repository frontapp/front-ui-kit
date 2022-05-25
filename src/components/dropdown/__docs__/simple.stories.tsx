import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {Button} from '../../button/button';
import {Icon} from '../../icon/icon';
import {Dropdown} from '../dropdown';
import {DropdownCoordinator} from '../dropdownCoordinator';
import {DropdownItem} from '../dropdownItem';
import {disabledDropdownStoryFields} from './dropdownStoryHelpers';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    ...disabledDropdownStoryFields
  }
} as ComponentMeta<typeof Dropdown>;

const itemsToRender = Array.from(Array(1000).keys());

const Template: ComponentStory<typeof Dropdown> = args => (
  <DropdownCoordinator
    {...args}
    placement="bottom-start"
    isInline
    renderButton={isDropdownOpen => <Button type="icon" isActive={isDropdownOpen}><Icon name="EllipsisVertical" /></Button>}
    renderDropdown={() => (
      <Dropdown {...args}>
        {itemsToRender.map(itemId => (
          <DropdownItem key={itemId} onClick={() => console.log('Clicked item', itemId)}>
            Dropdown Item: {itemId}
          </DropdownItem>
        ))}
      </Dropdown>
    )}
  />
);
export const Simple = Template.bind({});
