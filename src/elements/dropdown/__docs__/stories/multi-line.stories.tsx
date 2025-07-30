import type { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Dropdown } from '../../dropdown';
import { DropdownButton } from '../../dropdownButton';
import { DropdownCoordinator } from '../../dropdownCoordinator';
import { DropdownItem } from '../../dropdownItem';
import { DropdownItemSkeleton } from '../../skeleton/dropdownItemSkeleton';

interface UserData {
  id: string;
  name: string;
  email: string;
}

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 225px;
`;

const StyledDropdownWrapperDiv = styled.div`
  width: 300px;
`;

const Template: StoryFn<typeof DropdownCoordinator> = () => {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<ReadonlyArray<UserData>>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>();

  const fetchUserData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    // Create a 1 second delay between requests.
    setTimeout(async () => {
      const data = await fetch(`https://randomuser.me/api/?page=${page}&results=15&seed=12345`);
      const jsonData = await data.json();
      setUsers((existingUsers) => [
        ...existingUsers,
        ...jsonData.results.map((d) => ({
          id: d.login.uuid,
          name: `${d.name.first} ${d.name.last}`,
          email: d.email
        }))
      ]);
      setPage((currentPage) => currentPage + 1);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <StyledWrapperDiv>
      <StyledDropdownWrapperDiv>
        <DropdownCoordinator
          layerRootId="story--elements-dropdown--multi-line"
          placement="bottom-start"
          renderButton={(isDropdownOpen, isDisabled, buttonRef) => (
            <DropdownButton
              buttonRef={buttonRef}
              isDisabled={isDisabled}
              value={users.find((u) => u.id === selectedUserId)?.name || ''}
              isActive={isDropdownOpen}
              placeholder="Select an option"
            />
          )}
          onDropdownClosed={() => {
            setIsLoading(false);
          }}
          renderDropdown={(_onRequestClose, buttonWidth) => (
            <Dropdown
              maxWidth={buttonWidth}
              maxHeight={200}
              isLoading={isLoading}
              hasMore={page < 5}
              onLoadMore={fetchUserData}
              loadingSkeleton={<DropdownItemSkeleton hasDescription />}>
              {users.map((user) => (
                <DropdownItem
                  key={user.id}
                  description={user.email}
                  onClick={() => setSelectedUserId(user.id)}
                  isSelected={user.id === selectedUserId}>
                  {user.name}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        />
      </StyledDropdownWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const MultiLine = Template.bind({});
