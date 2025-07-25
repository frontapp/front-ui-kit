import type { StoryFn } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { palette } from '../../../../helpers/colorHelpers';
import { EmptyState } from '../../../emptyState/emptyState';
import { Dropdown } from '../../dropdown';
import { DropdownButton } from '../../dropdownButton';
import { DropdownCoordinator } from '../../dropdownCoordinator';
import { DropdownHeader } from '../../dropdownHeader';
import { DropdownHeading } from '../../dropdownHeading';
import { DropdownItem } from '../../dropdownItem';
import { DropdownItemIcon } from '../../dropdownItemIcon';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 325px;
`;

const StyledDropdownWrapperDiv = styled.div`
  width: 300px;
`;

const dogBreedsSource = [
  'Affenpinscher',
  'Armant',
  'Bedlington Terrier',
  'Boston Terrier',
  'Bullmastiff',
  'Chilean Fox Terrier',
  'Dalmatian',
  'English Water Spaniel',
  'German Spitz',
  'Hamiltonstövare',
  'Jack Russell Terrier',
  'Kyi-Leo',
  'Miniature Pinscher',
  'Old Croatian Sighthound',
  'Picardy Spaniel',
  'Pyrenean Mastiff',
  'Schillerstövare',
  'Slovak Cuvac',
  'Talbot',
  'Volpino Italiano'
];

const Template: StoryFn<typeof DropdownCoordinator> = () => {
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
    setDogBreeds(dogBreedsSource.filter((b) => b.toLowerCase().includes(lowerSearchValue)));
  }, [searchValue]);

  return (
    <StyledWrapperDiv>
      <StyledDropdownWrapperDiv>
        <DropdownCoordinator
          layerRootId="story--elements-dropdown--header"
          placement="bottom-start"
          renderButton={(isDropdownOpen, isDisabled, buttonRef, onClick) => (
            <DropdownButton
              placeholder="Select dog breed"
              isActive={isDropdownOpen}
              isDisabled={isDisabled}
              buttonRef={buttonRef}
              iconName="Search"
              maxWidth={300}
              value={selectedDogBreed}
              onClick={onClick}
            />
          )}
          onDropdownClosed={() => setSearchValue('')}
          renderDropdown={(_onRequestClose, buttonWidth) => (
            <Dropdown
              isEmpty={dogBreeds.length === 0}
              renderEmptyState={() => <EmptyState message="Could not find dog breed." />}
              maxHeight={200}
              maxWidth={buttonWidth}>
              <DropdownHeader
                searchValue={searchValue}
                searchPlaceholder="Search dog breeds..."
                onBackClick={searchValue ? onBackClick : undefined}
                onSearchChange={setSearchValue}>
                Dog Breeds
              </DropdownHeader>
              {!searchValue && (
                <>
                  <DropdownHeading>Create</DropdownHeading>
                  <DropdownItem>
                    <DropdownItemIcon color={palette.blue.shade40} iconName="PlusCircle" />
                    Create new breed
                  </DropdownItem>
                  <DropdownHeading>Dog Breeds</DropdownHeading>
                </>
              )}
              {dogBreeds.map((breed) => (
                <DropdownItem
                  key={breed}
                  isSelected={selectedDogBreed === breed}
                  onClick={() => setSelectedDogBreed(breed)}>
                  {breed}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        />
      </StyledDropdownWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const Header = Template.bind({});
