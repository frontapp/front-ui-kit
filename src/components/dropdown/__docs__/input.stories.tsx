import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {useState} from 'react';

import {VisualSizesEnum} from '../../../helpers/fontHelpers';
import {Button} from '../../button/button';
import {ButtonGroup} from '../../button/buttonGroup';
import {Input} from '../../input/input';
import {Dropdown} from '../dropdown';
import {DropdownButton} from '../dropdownButton';
import {DropdownCoordinator} from '../dropdownCoordinator';
import {DropdownFooter} from '../dropdownFooter';
import {DropdownHeader} from '../dropdownHeader';
import {DropdownItem} from '../dropdownItem';
import {DropdownItemInput} from '../dropdownItemInput';
import {disabledDropdownStoryFields} from './dropdownStoryHelpers';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    ...disabledDropdownStoryFields
  }
} as ComponentMeta<typeof Dropdown>;

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
  const [selectedDog, setSelectedDog] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <DropdownCoordinator
      {...args}
      placement="bottom-start"
      isInline
      renderButton={isDropdownOpen => <Button isActive={isDropdownOpen}>View Dropdown Form</Button>}
      renderDropdown={() => (
        <Dropdown {...args}>
          <DropdownHeader>Sign up</DropdownHeader>

          <DropdownItemInput label="Your name">
            <Input placeholder="John Doe" value={name} onChange={setName} />
          </DropdownItemInput>
          <DropdownItemInput label="Your email">
            <Input placeholder="john.doe@example.com" value={email} onChange={setEmail} />
          </DropdownItemInput>
          <DropdownItemInput label="Your favorite dog breed">
            <DropdownCoordinator
              placement="bottom-start"
              renderButton={isDropdownOpen => (
                <DropdownButton
                  placeholder="Select dog breed"
                  isActive={isDropdownOpen}
                  value={selectedDog}
                />
              )}
              renderDropdown={() => (
                <Dropdown maxWidth={244}>
                  <DropdownHeader>
                    Dog Breeds
                  </DropdownHeader>
                  {dogBreedsSource.map(breed => (
                    <DropdownItem key={breed} onClick={() => setSelectedDog(breed)}>
                      {breed}
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            />
          </DropdownItemInput>

          <DropdownFooter>
            <ButtonGroup align="right">
              <Button size={VisualSizesEnum.SMALL}>Cancel</Button>
              <Button type="primary" size={VisualSizesEnum.SMALL}>Submit</Button>
            </ButtonGroup>
          </DropdownFooter>
        </Dropdown>
      )}
    />
  );
};
export const InputForm = Template.bind({});
