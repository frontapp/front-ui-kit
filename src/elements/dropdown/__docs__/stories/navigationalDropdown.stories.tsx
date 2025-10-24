import type {StoryFn} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {palette} from '../../../../helpers/colorHelpers';
import {EmptyState} from '../../../emptyState/emptyState';
import {NavigationalDropdownContainer} from '../../components/NavigationalDropdownContainer';
import {NavigationalDropdownProvider} from '../../context/NavigationalDropdownContext';
import {Dropdown} from '../../dropdown';
import {DropdownButton} from '../../dropdownButton';
import {DropdownCoordinator} from '../../dropdownCoordinator';
import {DropdownHeader} from '../../dropdownHeader';
import {DropdownHeading} from '../../dropdownHeading';
import {DropdownItem} from '../../dropdownItem';
import {DropdownItemIcon} from '../../dropdownItemIcon';

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

  // Render inbox sections
  const renderInboxSections = () => {
    const anyInboxes = getFilteredItems(inboxesData.slice(0, 2), 'inboxes');
    const individualInboxes = getFilteredItems(inboxesData.slice(2, 4), 'inboxes');
    const sharedInboxes = getFilteredItems(inboxesData.slice(4), 'inboxes');

    return (
      <>
        {anyInboxes.length > 0 && (
          <>
            <DropdownHeading>Any</DropdownHeading>
            {anyInboxes.map((inbox) => (
              <DropdownItem
                key={inbox.id}
                type="multi"
                isSelected={selectedFilters.inboxes.includes(inbox.id)}
                onClick={() => toggleFilter('inboxes', inbox.id)}>
                <DropdownItemIcon color={palette.blue.shade40} iconName="Archive" />
                {inbox.name}
              </DropdownItem>
            ))}
          </>
        )}
        {individualInboxes.length > 0 && (
          <>
            <DropdownHeading>Individual</DropdownHeading>
            {individualInboxes.map((inbox) => (
              <DropdownItem
                key={inbox.id}
                type="multi"
                isSelected={selectedFilters.inboxes.includes(inbox.id)}
                onClick={() => toggleFilter('inboxes', inbox.id)}>
                <DropdownItemIcon color={palette.green.shade40} iconName="Archive" />
                {inbox.name}
              </DropdownItem>
            ))}
          </>
        )}
        {sharedInboxes.length > 0 && (
          <>
            <DropdownHeading>Shared</DropdownHeading>
            {sharedInboxes.map((inbox) => (
              <DropdownItem
                key={inbox.id}
                type="multi"
                isSelected={selectedFilters.inboxes.includes(inbox.id)}
                onClick={() => toggleFilter('inboxes', inbox.id)}>
                <DropdownItemIcon color={palette.purple.shade40} iconName="Archive" />
                {inbox.name}
              </DropdownItem>
            ))}
          </>
        )}
      </>
    );
  };

  const getRootContent = () => (
    <Dropdown>
      <DropdownHeading>Filter by</DropdownHeading>

      <DropdownItem
        submenuMode="navigational"
        submenuBackTitle="Filter by"
        submenuId="inboxes"
        submenu={
          <Dropdown
            isEmpty={getFilteredItems(inboxesData, 'inboxes').length === 0 && Boolean(searchValues.inboxes)}
            renderEmptyState={() => <EmptyState message="No inboxes found" />}>
            <DropdownHeader
              searchValue={searchValues.inboxes || ''}
              searchPlaceholder="Search inboxes..."
              onSearchChange={(newValue) => setSearchValues((prev) => ({...prev, inboxes: newValue}))}>
              Inboxes
            </DropdownHeader>
            {renderInboxSections()}
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
          <Dropdown
            isEmpty={getFilteredItems(tagsData, 'tags').length === 0 && Boolean(searchValues.tags)}
            renderEmptyState={() => <EmptyState message="No tags found" />}>
            <DropdownHeader
              searchValue={searchValues.tags || ''}
              searchPlaceholder="Search tags..."
              onSearchChange={(newValue) => setSearchValues((prev) => ({...prev, tags: newValue}))}>
              Tags
            </DropdownHeader>
            {getFilteredItems(tagsData, 'tags').length > 0 && (
              <>
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
              </>
            )}
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
          <Dropdown
            isEmpty={
              getFilteredItems(assigneesData, 'assignees').length === 0 && Boolean(searchValues.assignees)
            }
            renderEmptyState={() => <EmptyState message="No assignees found" />}>
            <DropdownHeader
              searchValue={searchValues.assignees || ''}
              searchPlaceholder="Search assignees..."
              onSearchChange={(newValue) => setSearchValues((prev) => ({...prev, assignees: newValue}))}>
              Assignees
            </DropdownHeader>
            {getFilteredItems(assigneesData, 'assignees').length > 0 && (
              <>
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
              </>
            )}
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

  const getSelectedItemNames = (): string[] => {
    const names: string[] = [];

    // Get selected inbox names
    selectedFilters.inboxes.forEach((id) => {
      const inbox = inboxesData.find((item) => item.id === id);
      if (inbox) names.push(inbox.name);
    });

    // Get selected tag names
    selectedFilters.tags.forEach((id) => {
      const tag = tagsData.find((item) => item.id === id);
      if (tag) names.push(tag.name);
    });

    // Get selected assignee names
    selectedFilters.assignees.forEach((id) => {
      const assignee = assigneesData.find((item) => item.id === id);
      if (assignee) names.push(assignee.name);
    });

    // Get selected status names
    selectedFilters.statuses.forEach((id) => {
      const status = ticketStatusesData.find((item) => item.id === id);
      if (status) names.push(status.name);
    });

    return names;
  };

  // Calculate a version number based on the total number of selected filters and search values
  // We need to include search values to trigger re-renders when typing
  const contentVersion =
    selectedFilters.inboxes.length +
    selectedFilters.tags.length +
    selectedFilters.assignees.length +
    selectedFilters.statuses.length +
    Object.values(searchValues).join('').length;

  return (
    <StyledWrapperDiv>
      <StyledDropdownWrapperDiv>
        <NavigationalDropdownProvider
          getRootContent={getRootContent}
          rootId="filter-menu"
          contentVersion={contentVersion}
          onNavigate={(level, id) => console.log('Navigated to:', id, 'at level', level)}
          onNavigateBack={(level, id) => console.log('Navigated back to:', id, 'at level', level)}>
          <DropdownCoordinator
            placement="bottom-start"
            renderButton={(isOpen) => (
              <DropdownButton
                value={getSelectedItemNames().length > 0 ? getSelectedItemNames() : []}
                placeholder="Filter by"
                isActive={isOpen}
              />
            )}
            renderDropdown={(onRequestClose) => <NavigationalDropdownContainer />}
          />
        </NavigationalDropdownProvider>
      </StyledDropdownWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const BasicNavigational = BasicNavigationalTemplate.bind({});
BasicNavigational.storyName = 'Basic Navigational Dropdown';

// Type definitions for deep navigation data structure
type NavigationItem = {
  id: string;
  name: string;
  price: string;
};

type NavigationSubSubcategory = {
  id: string;
  name: string;
  icon: 'Calendar' | 'Star' | 'Gear';
  color: string;
  items: NavigationItem[];
};

type NavigationSubcategory = {
  id: string;
  name: string;
  icon: 'Calendar' | 'Star' | 'Gear';
  color: string;
  subcategories: NavigationSubSubcategory[];
};

type NavigationCategory = {
  id: string;
  name: string;
  icon: 'Calendar' | 'Star' | 'Gear';
  color: string;
  subcategories: NavigationSubcategory[];
};

// Deep navigation data structure
const deepNavigationData: {categories: NavigationCategory[]} = {
  categories: [
    {
      id: 'products',
      name: 'Products',
      icon: 'Gear' as const,
      color: palette.blue.shade40,
      subcategories: [
        {
          id: 'electronics',
          name: 'Electronics',
          icon: 'Star' as const,
          color: palette.green.shade40,
          subcategories: [
            {
              id: 'phones',
              name: 'Phones',
              icon: 'Calendar' as const,
              color: palette.purple.shade40,
              items: [
                {id: 'iphone', name: 'iPhone 15 Pro', price: '$999'},
                {id: 'samsung', name: 'Samsung Galaxy S24', price: '$799'},
                {id: 'pixel', name: 'Google Pixel 8', price: '$699'},
                {id: 'oneplus', name: 'OnePlus 12', price: '$599'}
              ]
            },
            {
              id: 'laptops',
              name: 'Laptops',
              icon: 'Calendar' as const,
              color: palette.orange.shade40,
              items: [
                {id: 'macbook', name: 'MacBook Pro M3', price: '$1999'},
                {id: 'thinkpad', name: 'ThinkPad X1 Carbon', price: '$1299'},
                {id: 'surface', name: 'Surface Laptop 5', price: '$999'},
                {id: 'dell', name: 'Dell XPS 13', price: '$899'}
              ]
            }
          ]
        },
        {
          id: 'clothing',
          name: 'Clothing',
          icon: 'Star' as const,
          color: palette.red.shade40,
          subcategories: [
            {
              id: 'mens',
              name: "Men's Clothing",
              icon: 'Calendar' as const,
              color: palette.blue.shade40,
              items: [
                {id: 'shirts', name: 'Dress Shirts', price: '$49'},
                {id: 'pants', name: 'Chino Pants', price: '$79'},
                {id: 'jackets', name: 'Blazers', price: '$199'},
                {id: 'shoes', name: 'Dress Shoes', price: '$149'}
              ]
            },
            {
              id: 'womens',
              name: "Women's Clothing",
              icon: 'Calendar' as const,
              color: palette.purple.shade40,
              items: [
                {id: 'dresses', name: 'Summer Dresses', price: '$89'},
                {id: 'tops', name: 'Blouses', price: '$59'},
                {id: 'skirts', name: 'Pencil Skirts', price: '$69'},
                {id: 'heels', name: 'High Heels', price: '$129'}
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'services',
      name: 'Services',
      icon: 'Gear' as const,
      color: palette.green.shade40,
      subcategories: [
        {
          id: 'consulting',
          name: 'Consulting',
          icon: 'Star' as const,
          color: palette.blue.shade40,
          subcategories: [
            {
              id: 'tech-consulting',
              name: 'Technology Consulting',
              icon: 'Calendar' as const,
              color: palette.purple.shade40,
              items: [
                {id: 'cloud-migration', name: 'Cloud Migration', price: '$5000'},
                {id: 'digital-transformation', name: 'Digital Transformation', price: '$15000'},
                {id: 'cybersecurity', name: 'Cybersecurity Audit', price: '$8000'},
                {id: 'data-analytics', name: 'Data Analytics Setup', price: '$12000'}
              ]
            },
            {
              id: 'business-consulting',
              name: 'Business Consulting',
              icon: 'Calendar' as const,
              color: palette.orange.shade40,
              items: [
                {id: 'strategy', name: 'Strategic Planning', price: '$20000'},
                {id: 'operations', name: 'Operations Optimization', price: '$15000'},
                {id: 'finance', name: 'Financial Analysis', price: '$10000'},
                {id: 'hr', name: 'HR Consulting', price: '$8000'}
              ]
            }
          ]
        }
      ]
    }
  ]
};

/**
 * Deep navigational dropdown example with 3+ levels
 */
const DeepNavigationalTemplate: StoryFn = () => {
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});

  const toggleItem = (categoryId: string, itemId: string) => {
    setSelectedItems((prev) => {
      const current = prev[categoryId] || [];
      const isSelected = current.includes(itemId);
      return {
        ...prev,
        [categoryId]: isSelected ? current.filter((id) => id !== itemId) : [...current, itemId]
      };
    });
  };

  const getFilteredItems = <T extends {name: string; id: string}>(items: T[], searchKey: string): T[] => {
    const search = searchValues[searchKey] || '';
    if (!search) return items;
    return items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
  };

  // Level 1: Main categories
  const renderMainCategories = () => (
    <Dropdown>
      <DropdownHeading>Browse Categories</DropdownHeading>
      {deepNavigationData.categories.map((category) => (
        <DropdownItem
          key={category.id}
          submenuMode="navigational"
          submenuBackTitle="Browse Categories"
          submenuId={`category-${category.id}`}
          submenu={renderSubcategories(category.subcategories, `category-${category.id}`)}>
          <DropdownItemIcon color={category.color} iconName={category.icon} />
          {category.name}
        </DropdownItem>
      ))}
    </Dropdown>
  );

  // Level 2: Subcategories (no search bar)
  const renderSubcategories = (subcategories: NavigationSubcategory[], parentId: string) => (
    <Dropdown>
      <DropdownHeader>
        {deepNavigationData.categories.find((cat) => `category-${cat.id}` === parentId)?.name || 'Categories'}
      </DropdownHeader>
      {subcategories.map((subcategory) => (
        <DropdownItem
          key={subcategory.id}
          submenuMode="navigational"
          submenuBackTitle={
            deepNavigationData.categories.find((cat) => `category-${cat.id}` === parentId)?.name ||
            'Categories'
          }
          submenuId={`subcategory-${subcategory.id}`}
          submenu={renderSubSubcategories(
            subcategory.subcategories,
            `subcategory-${subcategory.id}`,
            subcategory.name
          )}>
          <DropdownItemIcon color={subcategory.color} iconName={subcategory.icon} />
          {subcategory.name}
        </DropdownItem>
      ))}
    </Dropdown>
  );

  // Level 3: Sub-subcategories (no search bar)
  const renderSubSubcategories = (
    subSubcategories: NavigationSubSubcategory[],
    parentId: string,
    parentName: string
  ) => (
    <Dropdown>
      <DropdownHeader>{parentName}</DropdownHeader>
      {subSubcategories.map((subSubcategory) => (
        <DropdownItem
          key={subSubcategory.id}
          submenuMode="navigational"
          submenuBackTitle={parentName}
          submenuId={`items-${subSubcategory.id}`}
          submenu={renderItems(subSubcategory.items, `items-${subSubcategory.id}`, subSubcategory.name)}>
          <DropdownItemIcon color={subSubcategory.color} iconName={subSubcategory.icon} />
          {subSubcategory.name}
        </DropdownItem>
      ))}
    </Dropdown>
  );

  // Level 4: Items (final level)
  const renderItems = (items: NavigationItem[], parentId: string, parentName: string) => (
    <Dropdown
      isEmpty={getFilteredItems(items, parentId).length === 0 && Boolean(searchValues[parentId])}
      renderEmptyState={() => <EmptyState message="No items found" />}>
      <DropdownHeader
        searchValue={searchValues[parentId] || ''}
        searchPlaceholder="Search items..."
        onSearchChange={(newValue) => setSearchValues((prev) => ({...prev, [parentId]: newValue}))}>
        {parentName}
      </DropdownHeader>
      {getFilteredItems(items, parentId).length > 0 && (
        <>
          <DropdownHeading>Available Items</DropdownHeading>
          {getFilteredItems(items, parentId).map((item) => (
            <DropdownItem
              key={item.id}
              type="multi"
              isSelected={selectedItems[parentId]?.includes(item.id) || false}
              onClick={() => toggleItem(parentId, item.id)}
              description={item.price}>
              {item.name}
            </DropdownItem>
          ))}
        </>
      )}
    </Dropdown>
  );

  const getRootContent = () => renderMainCategories();

  const getSelectedItemNames = (): string[] => {
    const names: string[] = [];
    Object.entries(selectedItems).forEach(([categoryId, itemIds]) => {
      // Find the items by traversing the data structure
      deepNavigationData.categories.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
          subcategory.subcategories.forEach((subSubcategory) => {
            if (`items-${subSubcategory.id}` === categoryId)
              itemIds.forEach((itemId) => {
                const item = subSubcategory.items.find((i) => i.id === itemId);
                if (item) names.push(item.name);
              });
          });
        });
      });
    });
    return names;
  };

  // Calculate content version for re-renders
  // Include selected items to trigger re-renders when items are selected
  // This will cause navigation reset, but the auto-navigation should bring us back
  const selectedItemsCount = Object.values(selectedItems).flat().length;
  const contentVersion = selectedItemsCount + Object.values(searchValues).join('').length;

  return (
    <StyledWrapperDiv>
      <StyledDropdownWrapperDiv>
        <NavigationalDropdownProvider
          getRootContent={getRootContent}
          rootId="deep-navigation-menu"
          contentVersion={contentVersion}
          onNavigate={(level, id) => console.log('Navigated to:', id, 'at level', level)}
          onNavigateBack={(level, id) => console.log('Navigated back to:', id, 'at level', level)}>
          <DropdownCoordinator
            placement="bottom-start"
            renderButton={(isOpen) => (
              <DropdownButton
                value={getSelectedItemNames().length > 0 ? getSelectedItemNames() : []}
                placeholder="Browse deep navigation"
                isActive={isOpen}
              />
            )}
            renderDropdown={(onRequestClose) => <NavigationalDropdownContainer />}
          />
        </NavigationalDropdownProvider>
      </StyledDropdownWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const DeepNavigational = DeepNavigationalTemplate.bind({});
DeepNavigational.storyName = 'Deep Navigational Dropdown (3+ Levels)';
