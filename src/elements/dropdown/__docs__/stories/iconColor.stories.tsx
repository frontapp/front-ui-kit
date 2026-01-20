import type {StoryFn} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {palette} from '../../../../helpers/colorHelpers';
import {Icon} from '../../../icon/icon';
import {Dropdown} from '../../dropdown';
import {DropdownButton} from '../../dropdownButton';
import {DropdownCoordinator} from '../../dropdownCoordinator';
import {DropdownItem} from '../../dropdownItem';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 300px;
`;

const StyledDropdownWrapperDiv = styled.div`
  width: 300px;
`;

const StyledDropdownItemContentDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface InboxOption {
  id: string;
  name: string;
  color: string;
}

const inboxOptions: ReadonlyArray<InboxOption> = [
  {id: '1', name: 'Support', color: palette.red.shade40},
  {id: '2', name: 'Sales', color: palette.blue.shade40},
  {id: '3', name: 'Engineering', color: palette.green.shade40},
  {id: '4', name: 'Marketing', color: palette.purple.shade40},
  {id: '5', name: 'Operations', color: palette.orange.shade40}
];

const Template: StoryFn<typeof DropdownCoordinator> = () => {
  const [selectedInboxId, setSelectedInboxId] = useState<string>();
  const selectedInbox = inboxOptions.find((inbox) => inbox.id === selectedInboxId);

  return (
    <StyledWrapperDiv>
      <StyledDropdownWrapperDiv>
        <DropdownCoordinator
          layerRootId="story--elements-dropdown--icon-color"
          placement="bottom-start"
          renderButton={(isDropdownOpen, isDisabled, buttonRef) => (
            <DropdownButton
              buttonRef={buttonRef}
              isDisabled={isDisabled}
              value={selectedInbox?.name ?? ''}
              isActive={isDropdownOpen}
              placeholder="Select an inbox"
              iconName={selectedInbox ? 'Inbox' : undefined}
              iconColor={selectedInbox?.color}
            />
          )}
          renderDropdown={(_onRequestClose, buttonWidth) => (
            <Dropdown maxWidth={buttonWidth} shouldUseItemsHeight>
              {inboxOptions.map((inbox) => (
                <DropdownItem
                  key={inbox.id}
                  onClick={() => setSelectedInboxId(inbox.id)}
                  isSelected={inbox.id === selectedInboxId}>
                  <StyledDropdownItemContentDiv>
                    <Icon name="Inbox" color={inbox.color} />
                    {inbox.name}
                  </StyledDropdownItemContentDiv>
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        />
      </StyledDropdownWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const IconColor = Template.bind({});
