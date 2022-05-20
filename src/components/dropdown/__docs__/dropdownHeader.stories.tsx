import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import {Dropdown} from '../dropdown';
import {DropdownButton} from '../dropdownButton';
import {DropdownCoordinator} from '../dropdownCoordinator';
import {DropdownHeader} from '../dropdownHeader';
import {DropdownItem} from '../dropdownItem';
import {disabledDropdownStoryFields} from './dropdownStoryHelpers';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    ...disabledDropdownStoryFields
  }
} as ComponentMeta<typeof Dropdown>;

const StyledDropdownStoryWrapperDiv = styled.div`
  padding: 16px;
  background: white;
  border-radius: 8px;
`;

const dogBreedsSource = [
  "Affenpinscher",
  "Armant",
  "Bedlington Terrier",
  "Boston Terrier",
  "Bullmastiff",
  "Chilean Fox Terrier",
  "Dalmatian",
  "English Water Spaniel",
  "German Spitz",
  "Hamiltonstövare",
  "Jack Russell Terrier",
  "Kyi-Leo",
  "Miniature Pinscher",
  "Old Croatian Sighthound",
  "Picardy Spaniel",
  "Pyrenean Mastiff",
  "Schillerstövare",
  "Slovak Cuvac",
  "Talbot",
  "Volpino Italiano"
];

const Template: ComponentStory<typeof Dropdown> = args => {
  const [searchValue, setSearchValue] = useState('');
  const [dogBreeds, setDogBreeds] = useState(dogBreedsSource);
  const [selectedDogBreed, setSelectedDogBreed] = useState('');

  // This is not really what the back button would be used for but it shows that it
  // can be dynamically rendered.
  const onBackClick = () => {
    setSearchValue('');
  };

  useEffect(() => {
    const lowerSearchValue = searchValue.toLowerCase();
    setDogBreeds(dogBreedsSource.filter(b => b.toLowerCase().includes(lowerSearchValue)));
  }, [searchValue]);

  return (
    <StyledDropdownStoryWrapperDiv>
      <DropdownCoordinator
        {...args}
        placement="bottom-start"
        renderButton={isDropdownOpen => (
          <DropdownButton
            placeholder="Select dog breed"
            isActive={isDropdownOpen}
            maxWidth={300}
          >
            {selectedDogBreed}
          </DropdownButton>
        )}
        onDropdownOpen={() => setSearchValue('')}
        renderDropdown={() => (
          <Dropdown {...args}>
            <DropdownHeader
              searchValue={searchValue}
              searchPlaceholder="Search dog breeds..."
              onBackClick={searchValue ? onBackClick : undefined}
              onSearchChange={setSearchValue}
            >
              Dog Breeds
            </DropdownHeader>
            {dogBreeds.map(breed => (
              <DropdownItem key={breed} onClick={() => setSelectedDogBreed(breed)}>
                {breed}
              </DropdownItem>
            ))}
          </Dropdown>
        )}
      />
    </StyledDropdownStoryWrapperDiv>
  );
};
export const WithHeader = Template.bind({});
WithHeader.args = {
  width: 300,
  minHeight: 342
};
