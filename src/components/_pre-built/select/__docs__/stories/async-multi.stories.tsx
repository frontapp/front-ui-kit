import {ComponentStory} from '@storybook/react';
import _ from 'lodash';
import React, {useState} from 'react';
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
  height: 375px;
`;

const StyledMenuWrapperDiv = styled.div`
  padding: 8px;
  border-radius: 8px;
  background: white;
  width: 350px;
`;

const Template: ComponentStory<typeof Select> = args => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<ReadonlyArray<UserData>>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<ReadonlyArray<string>>([]);

  const fetchUserData = async () => {
    if (isLoading)
      return;
    setIsLoading(true);
    // Create a 1 second delay between requests.
    setTimeout(async () => {
      const data = await fetch(`https://randomuser.me/api/?page=${page}&results=15&seed=example`);
      const jsonData = await data.json();
      setUsers(existingUsers => [...existingUsers, ...jsonData.results.map(d => ({id: d.login.uuid, name: `${d.name.first} ${d.name.last}`}))]);
      setPage(currentPage => currentPage + 1);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <StyledWrapperDiv>
      <StyledMenuWrapperDiv>
        <Select
          {...args}
          selectedValues={_(selectedUserIds.map(id => users.find(i => i.id === id)?.name)).compact().value()}
          isLoading={isLoading}
          hasMore={page < 5}
          onLoadMore={fetchUserData}
          layerRootId="story--components-select--async-multi"
        >
          {users.map(user => (
            <SelectItem
              key={user.id}
              type="multi"
              isSelected={selectedUserIds.includes(user.id)}
              onClick={() => setSelectedUserIds(userIds => {
                if (userIds?.includes(user.id))
                  return userIds.filter(id => id !== user.id);
                return [
                  ...userIds,
                  user.id
                ];
              })}
            >
              {user.name}
            </SelectItem>
          ))}
        </Select>
      </StyledMenuWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const AsyncMulti = Template.bind({});
