import type { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from '../../../../components/button/button';
import { ButtonGroup } from '../../../../components/button/buttonGroup';
import { VisualSizesEnum } from '../../../../helpers/fontHelpers';
import { Input } from '../../../input/input';
import { Dropdown } from '../../dropdown';
import { DropdownButton } from '../../dropdownButton';
import { DropdownCoordinator } from '../../dropdownCoordinator';
import { DropdownFooter } from '../../dropdownFooter';
import { DropdownHeader } from '../../dropdownHeader';
import { DropdownItem } from '../../dropdownItem';
import { DropdownItemFormField } from '../../dropdownItemFormField';

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

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 350px;
`;

const StyledDropdownWrapperDiv = styled.div`
  width: 300px;
`;

const Template: StoryFn<typeof DropdownCoordinator> = () => {
  const [selectedDog, setSelectedDog] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <StyledWrapperDiv>
      <StyledDropdownWrapperDiv>
        <DropdownCoordinator
          layerRootId="story--elements-dropdown--form"
          placement="bottom-start"
          renderButton={(isDropdownOpen) => <Button isActive={isDropdownOpen}>View Dropdown Form</Button>}
          renderDropdown={(onRequestClose) => (
            <Dropdown maxHeight={200}>
              <DropdownHeader>Sign up</DropdownHeader>

              <DropdownItemFormField label="Your name">
                <Input placeholder="John Doe" value={name} onChange={setName} />
              </DropdownItemFormField>
              <DropdownItemFormField label="Your email">
                <Input placeholder="john.doe@example.com" value={email} onChange={setEmail} />
              </DropdownItemFormField>
              <DropdownItemFormField label="Your favorite dog breed">
                <DropdownCoordinator
                  layerRootId="story--elements-dropdown--form-nested"
                  placement="bottom-start"
                  renderButton={(isDropdownOpen) => (
                    <DropdownButton
                      placeholder="Select dog breed"
                      isActive={isDropdownOpen}
                      value={selectedDog}
                    />
                  )}
                  renderDropdown={(_onRequestClose, buttonWidth) => (
                    <Dropdown maxWidth={244} maxHeight={200}>
                      <DropdownHeader>Dog Breeds</DropdownHeader>
                      {dogBreedsSource.map((breed) => (
                        <DropdownItem key={breed} onClick={() => setSelectedDog(breed)}>
                          {breed}
                        </DropdownItem>
                      ))}
                    </Dropdown>
                  )}
                />
              </DropdownItemFormField>

              <DropdownFooter>
                <ButtonGroup align="right">
                  <Button size={VisualSizesEnum.SMALL} onClick={onRequestClose}>
                    Cancel
                  </Button>
                  <Button type="primary" size={VisualSizesEnum.SMALL} onClick={onRequestClose}>
                    Submit
                  </Button>
                </ButtonGroup>
              </DropdownFooter>
            </Dropdown>
          )}
        />
      </StyledDropdownWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const Form = Template.bind({});
