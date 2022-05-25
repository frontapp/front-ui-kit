import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {useState} from 'react';

import {Button} from '../../button/button';
import {Icon} from '../../icon/icon';
import {Dropdown} from '../dropdown';
import {DropdownCoordinator} from '../dropdownCoordinator';
import {DropdownItem} from '../dropdownItem';
import {disabledDropdownStoryFields} from './dropdownStoryHelpers';

interface UserData {
  id: string;
  name: string;
}

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    ...disabledDropdownStoryFields
  }
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = args => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<ReadonlyArray<UserData>>([]);

  const fetchUserData = async () => {
    if (isLoading)
      return;
    setIsLoading(true);
    // Create a 1 second delay between requests.
    setTimeout(async () => {
      const data = await fetch(`https://randomuser.me/api/?page=${page}&results=15`);
      const jsonData = await data.json();
      setUsers(existingUsers => [...existingUsers, ...jsonData.results.map(d => ({id: d.login.uuid, name: `${d.name.first} ${d.name.last}`}))]);
      setPage(currentPage => currentPage + 1);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <DropdownCoordinator
      {...args}
      placement="bottom-start"
      renderButton={() => <Button type="icon"><Icon name="EllipsisVertical" /></Button>}
      isInline
      onDropdownClosed={() => {
        setPage(1);
        setIsLoading(false);
        setUsers([]);
      }}
      renderDropdown={() => (
        <Dropdown
          {...args}
          isLoading={isLoading}
          hasMore={page < 5}
          onLoadMore={fetchUserData}
        >
          {users.map(user => (
            <DropdownItem key={user.id} onClick={() => console.log('Selected user:', user)}>
              {user.name}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    />
  );
};
export const SimpleAsync = Template.bind({});
SimpleAsync.args = {
  loadingThreshold: 3
};