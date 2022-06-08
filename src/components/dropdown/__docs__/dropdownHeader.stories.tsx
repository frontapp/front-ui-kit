import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import {palette} from '../../../helpers/colorHelpers';
import {EmptyState} from '../../emptyState/emptyState';
import {Dropdown} from '../dropdown';
import {DropdownButton} from '../dropdownButton';
import {DropdownCoordinator} from '../dropdownCoordinator';
import {DropdownHeader} from '../dropdownHeader';
import {DropdownHeading} from '../dropdownHeading';
import {DropdownItem} from '../dropdownItem';
import {DropdownItemIcon} from '../dropdownItemIcon';
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
            iconName="Search"
            maxWidth={300}
            value={selectedDogBreed}
          />
        )}
        onDropdownClosed={() => setSearchValue('')}
        renderDropdown={() => (
          <Dropdown
            {...args}
            isEmpty={dogBreeds.length === 0}
            renderEmptyState={() => <EmptyState message="Could not find dog breed." />}
          >
            <DropdownHeader
              searchValue={searchValue}
              searchPlaceholder="Search dog breeds..."
              onBackClick={searchValue ? onBackClick : undefined}
              onSearchChange={setSearchValue}
            >
              Dog Breeds
            </DropdownHeader>
            {!searchValue && (
              <>
                <DropdownHeading>
                  Create
                </DropdownHeading>
                <DropdownItem>
                  <DropdownItemIcon color={palette.blue.shade40} iconName="PlusCircle" />
                  Create new breed
                </DropdownItem>
                <DropdownHeading>
                  Dog Breeds
                </DropdownHeading>
              </>
            )}
            {dogBreeds.map(breed => (
              <DropdownItem key={breed} isSelected={selectedDogBreed === breed} onClick={() => setSelectedDogBreed(breed)}>
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
