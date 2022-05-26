import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Dropdown} from '../dropdown';
import {DropdownButton} from '../dropdownButton';
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

const StyledDropdownStoryWrapperDiv = styled.div`
  padding: 16px;
  background: white;
  border-radius: 8px;
`;

const Template: ComponentStory<typeof Dropdown> = args => {
  const [selectedNames, setSelectedNames] = useState<ReadonlyArray<string>>([]);
  return (
    <StyledDropdownStoryWrapperDiv>
      <DropdownCoordinator
        {...args}
        placement="bottom-start"
        renderButton={isDropdownOpen => (
          <DropdownButton
            isActive={isDropdownOpen}
            value={selectedNames}
            maxWidth={args.maxWidth}
            placeholder="Select Futurama Characters..."
          />
        )}
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
    </StyledDropdownStoryWrapperDiv>
  );
};
export const MultiSelect = Template.bind({});
MultiSelect.args = {
  maxWidth: 300
};
