import {ComponentStory} from '@storybook/react';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import {Select} from '../../select';
import {SelectItem} from '../../selectItem';

interface UserData {
  id: string;
  name: string;
}

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 450px;
`;

const StyledMenuWrapperDiv = styled.div`
  padding: 8px;
  border-radius: 8px;
  background: white;
  width: 350px;
`;

const Template: ComponentStory<typeof Select> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<ReadonlyArray<UserData>>([]);
  const [usersToDisplay, setUsersToDisplay] = useState<ReadonlyArray<UserData>>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!searchValue) {
      setUsersToDisplay(users);
      return;
    }

    setUsersToDisplay(users.filter(u => u.name.toLowerCase().includes(searchValue.toLowerCase())));
  }, [searchValue, users]);

  const fetchUserData = async () => {
    if (isLoading || users.length > 0)
      return;
    setIsLoading(true);
    // Create a 1 second delay between requests.
    setTimeout(async () => {
      const data = await fetch(`https://randomuser.me/api/?results=50&seed=example`);
      const jsonData = await data.json();
      setUsers(existingUsers => [
        ...existingUsers,
        ...jsonData.results.map(d => ({id: d.login.uuid, name: `${d.name.first} ${d.name.last}`}))
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <StyledWrapperDiv>
      <StyledMenuWrapperDiv>
        <Select
          selectedValues={users.find(user => user.id === selectedUserId)?.name}
          isLoading={isLoading}
          headerLabel="Search for a user"
          searchValue={searchValue}
          onSearchChange={value => {
            setSearchValue(value);
          }}
          onSelectClosed={() => {
            setSearchValue('');
          }}
          onSelectOpen={() => {
            fetchUserData();
          }}
          layerRootId="story--components-select--async-search"
        >
          {usersToDisplay.map(user => (
            <SelectItem
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              isSelected={user.id === selectedUserId}
            >
              {user.name}
            </SelectItem>
          ))}
        </Select>
      </StyledMenuWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const AsyncSearch = Template.bind({});
