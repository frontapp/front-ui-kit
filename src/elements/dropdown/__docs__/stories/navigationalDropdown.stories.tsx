import type {StoryFn} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {palette} from '../../../../helpers/colorHelpers';
import {NavigationalDropdownProvider} from '../../context/NavigationalDropdownContext';
import {Dropdown} from '../../dropdown';
import {DropdownButton} from '../../dropdownButton';
import {DropdownCoordinator} from '../../dropdownCoordinator';
import {DropdownHeader} from '../../dropdownHeader';
import {DropdownHeading} from '../../dropdownHeading';
import {DropdownItem} from '../../dropdownItem';
import {DropdownItemIcon} from '../../dropdownItemIcon';
import {NavigationalDropdownContainer} from '../../components/NavigationalDropdownContainer';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 600px;
  padding: 20px;
`;

const StyledDropdownWrapperDiv = styled.div`
  width: 300px;
`;

// Sample data matching the WhatsApp-style design
const inboxesData = [
  {id: 'any-individual', name: 'Any individual inbox', icon: 'Archive'},
  {id: 'any-shared', name: 'Any shared inbox', icon: 'Archive'},
  {id: 'personal', name: 'Personal Inbox', icon: 'Archive', isPrivate: true},
  {id: 'whatsapp', name: 'WhatsApp inbox', icon: 'Archive', isPrivate: true},
  {id: 'slack-test', name: '#slack-test2', icon: 'Archive'},
  {id: 'afennacy', name: 'afennacy', icon: 'Archive'},
  {id: 'acustin', name: 'acustin Slack test', icon: 'Archive'}
];

const tagsData = [
  {id: 'urgent', name: 'Urgent', color: palette.red.shade40},
  {id: 'follow-up', name: 'Follow-up', color: palette.orange.shade40},
  {id: 'resolved', name: 'Resolved', color: palette.green.shade40},
  {id: 'feedback', name: 'Feedback', color: palette.blue.shade40},
  {id: 'bug', name: 'Bug', color: palette.purple.shade40}
];

const assigneesData = [
  {id: 'alice', name: 'Alice Johnson', email: 'alice@example.com'},
  {id: 'bob', name: 'Bob Smith', email: 'bob@example.com'},
  {id: 'carol', name: 'Carol Davis', email: 'carol@example.com'},
  {id: 'david', name: 'David Wilson', email: 'david@example.com'}
];

const ticketStatusesData = [
  {id: 'open', name: 'Open', icon: 'Star' as const},
  {id: 'in-progress', name: 'In Progress', icon: 'Calendar' as const},
  {id: 'waiting', name: 'Waiting on Customer', icon: 'Calendar' as const},
  {id: 'resolved', name: 'Resolved', icon: 'Checkmark' as const},
  {id: 'closed', name: 'Closed', icon: 'Archive' as const}
];

/**
 * Basic navigational dropdown example
 */
const BasicNavigationalTemplate: StoryFn = () => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    inboxes: [],
    tags: [],
    assignees: [],
    statuses: []
  });

  const [searchValues, setSearchValues] = useState<Record<string, string>>({});

  const toggleFilter = (category: string, itemId: string) => {
    console.log('toggleFilter', category, itemId);
    console.log('selectedFilters', selectedFilters);
    console.log('searchValues', searchValues);
    setSelectedFilters((prev) => {
      const current = prev[category] || [];
      const isSelected = current.includes(itemId);
      return {
        ...prev,
        [category]: isSelected ? current.filter((id) => id !== itemId) : [...current, itemId]
      };
    });
  };

  const getFilteredItems = <T extends {name: string; id: string}>(items: T[], searchKey: string): T[] => {
    const search = searchValues[searchKey] || '';
    if (!search) return items;
    return items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  };

  const rootContent = (
    <Dropdown>
      <DropdownHeading>Filter by</DropdownHeading>

      <DropdownItem
        submenuMode="navigational"
        submenuBackTitle="Filter by"
        submenuId="inboxes"
        submenu={
          <Dropdown>
            <DropdownHeader
              searchValue={searchValues.inboxes || ''}
              searchPlaceholder="Search inboxes..."
              onSearchChange={(newValue) => setSearchValues((prev) => ({...prev, inboxes: newValue}))}>
              Inboxes
            </DropdownHeader>

            <DropdownHeading>Any</DropdownHeading>
            {getFilteredItems(inboxesData.slice(0, 2), 'inboxes').map((inbox) => (
              <DropdownItem
                key={inbox.id}
                type="multi"
                isSelected={selectedFilters.inboxes.includes(inbox.id)}
                onClick={() => toggleFilter('inboxes', inbox.id)}>
                <DropdownItemIcon color={palette.blue.shade40} iconName="Archive" />
                {inbox.name}
              </DropdownItem>
            ))}

            <DropdownHeading>Individual</DropdownHeading>
            {getFilteredItems(inboxesData.slice(2, 4), 'inboxes').map((inbox) => (
              <DropdownItem
                key={inbox.id}
                type="multi"
                isSelected={selectedFilters.inboxes.includes(inbox.id)}
                onClick={() => toggleFilter('inboxes', inbox.id)}>
                <DropdownItemIcon color={palette.green.shade40} iconName="Archive" />
                {inbox.name}
              </DropdownItem>
            ))}

            <DropdownHeading>Shared</DropdownHeading>
            {getFilteredItems(inboxesData.slice(4), 'inboxes').map((inbox) => (
              <DropdownItem
                key={inbox.id}
                type="multi"
                isSelected={selectedFilters.inboxes.includes(inbox.id)}
                onClick={() => toggleFilter('inboxes', inbox.id)}>
                <DropdownItemIcon color={palette.purple.shade40} iconName="Archive" />
                {inbox.name}
              </DropdownItem>
            ))}
          </Dropdown>
        }>
        <DropdownItemIcon color={palette.blue.shade40} iconName="Archive" />
        Inboxes
      </DropdownItem>

      <DropdownItem
        submenuMode="navigational"
        submenuBackTitle="Filter by"
        submenuId="tags"
        submenu={
          <Dropdown>
            <DropdownHeader
              searchValue={searchValues.tags || ''}
              searchPlaceholder="Search tags..."
              onSearchChange={(newValue) => setSearchValues((prev) => ({...prev, tags: newValue}))}>
              Tags
            </DropdownHeader>

            <DropdownHeading>Tags</DropdownHeading>
            {getFilteredItems(tagsData, 'tags').map((tag) => (
              <DropdownItem
                key={tag.id}
                type="multi"
                isSelected={selectedFilters.tags.includes(tag.id)}
                onClick={() => toggleFilter('tags', tag.id)}>
                <DropdownItemIcon color={tag.color} iconName="Star" />
                {tag.name}
              </DropdownItem>
            ))}
          </Dropdown>
        }>
        <DropdownItemIcon color={palette.orange.shade40} iconName="Star" />
        Tags
      </DropdownItem>

      <DropdownItem
        submenuMode="navigational"
        submenuBackTitle="Filter by"
        submenuId="assignees"
        submenu={
          <Dropdown>
            <DropdownHeader
              searchValue={searchValues.assignees || ''}
              searchPlaceholder="Search assignees..."
              onSearchChange={(newValue) => setSearchValues((prev) => ({...prev, assignees: newValue}))}>
              Assignees
            </DropdownHeader>

            <DropdownHeading>Assignees</DropdownHeading>
            {getFilteredItems(assigneesData, 'assignees').map((assignee) => (
              <DropdownItem
                key={assignee.id}
                type="multi"
                isSelected={selectedFilters.assignees.includes(assignee.id)}
                onClick={() => toggleFilter('assignees', assignee.id)}
                description={assignee.email}>
                {assignee.name}
              </DropdownItem>
            ))}
          </Dropdown>
        }>
        <DropdownItemIcon color={palette.green.shade40} iconName="Calendar" />
        Assignees
      </DropdownItem>

      <DropdownItem
        submenuMode="navigational"
        submenuBackTitle="Filter by"
        submenuId="statuses"
        submenu={
          <Dropdown>
            <DropdownHeader
              searchValue={searchValues.statuses || ''}
              searchPlaceholder="Search statuses..."
              onSearchChange={(newValue) => setSearchValues((prev) => ({...prev, statuses: newValue}))}>
              Ticket statuses
            </DropdownHeader>
            {getFilteredItems(ticketStatusesData, 'statuses').map((status) => (
              <DropdownItem
                key={status.id}
                type="multi"
                isSelected={selectedFilters.statuses.includes(status.id)}
                onClick={() => toggleFilter('statuses', status.id)}>
                <DropdownItemIcon color={palette.blue.shade40} iconName={status.icon} />
                {status.name}
              </DropdownItem>
            ))}
          </Dropdown>
        }>
        <DropdownItemIcon color={palette.purple.shade40} iconName="Gear" />
        Ticket statuses
      </DropdownItem>
    </Dropdown>
  );

  const getFilterSummary = () => {
    const total =
      selectedFilters.inboxes.length +
      selectedFilters.tags.length +
      selectedFilters.assignees.length +
      selectedFilters.statuses.length;
    if (total === 0) return 'Filter by';
    return `${total} filter${total > 1 ? 's' : ''} applied`;
  };

  return (
    <StyledWrapperDiv>
      <StyledDropdownWrapperDiv>
        <NavigationalDropdownProvider
          getRootContent={() => rootContent}
          rootId="filter-menu"
          onNavigate={(level, id) => console.log('Navigated to:', id, 'at level', level)}
          onNavigateBack={(level, id) => console.log('Navigated back to:', id, 'at level', level)}>
          <DropdownCoordinator
            placement="bottom-start"
            renderButton={(isOpen) => <DropdownButton value={getFilterSummary()} isActive={isOpen} />}
            renderDropdown={(onRequestClose) => <NavigationalDropdownContainer />}
          />
        </NavigationalDropdownProvider>
      </StyledDropdownWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const BasicNavigational = BasicNavigationalTemplate.bind({});
BasicNavigational.storyName = 'Basic Navigational Dropdown';
