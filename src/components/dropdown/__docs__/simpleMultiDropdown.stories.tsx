import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {useState} from 'react';

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

const names = [
  "Fry",
  "Zoidberg",
  "Hermes",
  "Morbo",
  "Leela",
  "Bender",
  "Amy Wong",
  "Scruffy",
  "Kif Kroker",
  "Zapp Brannigan",
  "Nibbler"
];

const Template: ComponentStory<typeof Dropdown> = args => {
  const [selectedNames, setSelectedNames] = useState<ReadonlyArray<string>>([]);
  return (
    <DropdownCoordinator
      {...args}
      placement="bottom-start"
      renderButton={() => <Button type="icon"><Icon name="EllipsisVertical" /></Button>}
      renderDropdown={() => (
        <Dropdown {...args}>
          {names.map(name => (
            <DropdownItem
              key={name}
              type="multi"
              isSelected={selectedNames.includes(name)}
              onClick={() => setSelectedNames(currentNames => {
                if (currentNames.includes(name))
                  return currentNames.filter(n => n !== name);
                return [...currentNames, name];
              })}
            >
              {name}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    />
  );
};
export const MultiSelect = Template.bind({});
