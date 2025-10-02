import type {StoryFn} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {palette} from '../../../../helpers/colorHelpers';
import {EmptyState} from '../../../emptyState/emptyState';
import {NestedDropdownProvider} from '../../context/NestedDropdownContext';
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
  height: 500px;
  padding: 20px;
`;

const StyledDropdownWrapperDiv = styled.div`
  width: 260px;
`;

const categoriesData = [
  {
    id: 'animals',
    name: 'Animals',
    icon: 'Archive',
    items: [
      'Affenpinscher',
      'Armant', 
      'Bedlington Terrier',
      'Boston Terrier',
      'Bullmastiff',
      'Chilean Fox Terrier',
      'Dalmatian',
      'English Water Spaniel',
      'German Spitz',
      'Hamiltonstövare'
    ]
  },
  {
    id: 'colors',
    name: 'Colors',
    icon: 'Star',
    items: [
      'Red',
      'Blue', 
      'Green',
      'Yellow',
      'Purple',
      'Orange',
      'Pink',
      'Brown',
      'Black',
      'White'
    ]
  },
  {
    id: 'countries',
    name: 'Countries',
    icon: 'Calendar',
    items: [
      'United States',
      'Canada',
      'United Kingdom',
      'Australia',
      'Germany',
      'France',
      'Japan',
      'Brazil',
      'India',
      'China'
    ]
  }
];

// Additional data for more complex examples
const departmentsData = [
  {
    id: 'engineering',
    name: 'Engineering',
    icon: 'Gear',
    teams: [
      {
        id: 'frontend',
        name: 'Frontend',
        members: ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'David Wilson']
      },
      {
        id: 'backend',
        name: 'Backend', 
        members: ['Eve Brown', 'Frank Miller', 'Grace Lee', 'Henry Taylor']
      },
      {
        id: 'mobile',
        name: 'Mobile',
        members: ['Ivy Chen', 'Jack Anderson', 'Kate Martinez', 'Leo Garcia']
      }
    ]
  },
  {
    id: 'design',
    name: 'Design',
    icon: 'Star',
    teams: [
      {
        id: 'ux',
        name: 'UX Design',
        members: ['Maya Patel', 'Noah Kim', 'Olivia Rodriguez', 'Paul Thompson']
      },
      {
        id: 'visual',
        name: 'Visual Design',
        members: ['Quinn White', 'Ruby Jackson', 'Sam Cooper', 'Tina Lewis']
      }
    ]
  },
  {
    id: 'product',
    name: 'Product',
    icon: 'Calendar',
    teams: [
      {
        id: 'strategy',
        name: 'Strategy',
        members: ['Uma Singh', 'Victor Clark', 'Wendy Hall', 'Xavier Young']
      }
    ]
  }
];

const Template: StoryFn = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [submenuSearchValues, setSubmenuSearchValues] = useState<Record<string, string>>({});
  const [filteredSubmenuItems, setFilteredSubmenuItems] = useState<Record<string, string[]>>({});

  const getFilteredItems = (categoryId: string, items: string[]) => {
    const searchValue = submenuSearchValues[categoryId] || '';
    if (!searchValue) return items;
    return items.filter(item => 
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  return (
    <StyledWrapperDiv>
      <StyledDropdownWrapperDiv>
        <NestedDropdownProvider
          config={{
            openDelay: 200,
            closeDelay: 500,
            maxDepth: 3,
            placement: 'right-start'
          }}>
          <DropdownCoordinator
            placement="bottom-start"
            renderButton={(isOpen, isDisabled, buttonRef) => (
              <DropdownButton 
                value={selectedValue || 'Select Category'}
                isActive={isOpen}
              />
            )}
            renderDropdown={(onRequestClose) => (
              <Dropdown>
                <DropdownHeading>Categories</DropdownHeading>
                {categoriesData.map((category) => (
                  <DropdownItem
                    key={category.id}
                    submenuId={`category-${category.id}`}
                    onSubmenuOpen={(id) => console.log('Opened submenu:', id)}
                    onSubmenuClose={(id) => console.log('Closed submenu:', id)}
                    submenu={
                      <Dropdown
                        isEmpty={getFilteredItems(category.id, category.items).length === 0}
                        renderEmptyState={() => (
                          <EmptyState
                            message="No results found. Try adjusting your search terms."
                          />
                        )}
                      >
                        <DropdownHeader
                          searchValue={submenuSearchValues[category.id] || ''}
                          searchPlaceholder={`Search ${category.name.toLowerCase()}...`}
                          onSearchChange={(newValue) => {
                            setSubmenuSearchValues(prev => ({
                              ...prev,
                              [category.id]: newValue
                            }));
                          }}>
                          {category.name}
                        </DropdownHeader>
                        <DropdownHeading>{category.name}</DropdownHeading>
                        {getFilteredItems(category.id, category.items).map((item) => (
                          <DropdownItem 
                            key={item} 
                            onClick={() => {
                              setSelectedValue(item);
                              onRequestClose();
                            }}>
                            {item}
                          </DropdownItem>
                        ))}
                        <DropdownItem onClick={() => console.log('Settings clicked')}>
                          <DropdownItemIcon color={palette.orange.shade40} iconName="Gear" />
                          Settings
                        </DropdownItem>
                      </Dropdown>
                    }>
                    <DropdownItemIcon 
                      color={palette.blue.shade40} 
                      iconName={category.icon as 'Archive' | 'Star' | 'Calendar'} 
                    />
                    {category.name}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          />
        </NestedDropdownProvider>
      </StyledDropdownWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const BasicNestedDropdown = Template.bind({});

export const CustomConfigDropdown = Template.bind({});
CustomConfigDropdown.storyName = 'Custom Configuration';
CustomConfigDropdown.decorators = [
  (Story) => (
    <NestedDropdownProvider
      config={{
        openDelay: 50,
        closeDelay: 500,
        maxDepth: 3,
        placement: 'right-start',
        enableKeyboardNavigation: true,
        layerIdPrefix: 'custom-nested'
      }}>
      <Story />
    </NestedDropdownProvider>
  )
];

// Multi-select nested dropdown example
const MultiSelectTemplate: StoryFn = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [submenuSearchValues, setSubmenuSearchValues] = useState<Record<string, string>>({});

  const getFilteredItems = (categoryId: string, items: string[]) => {
    const searchValue = submenuSearchValues[categoryId] || '';
    if (!searchValue) return items;
    return items.filter(item => 
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const toggleItem = (item: string) => {
    setSelectedItems(prev => 
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const getSelectedByCategory = (categoryItems: string[]) => 
    categoryItems.filter(item => selectedItems.includes(item)).length;

  return (
    <StyledWrapperDiv>
      <StyledDropdownWrapperDiv>
        <NestedDropdownProvider
          config={{
            openDelay: 200,
            closeDelay: 400,
            maxDepth: 3,
            placement: 'right-start'
          }}>
          <DropdownCoordinator
            placement="bottom-start"
            renderButton={(isOpen, isDisabled, buttonRef) => (
              <DropdownButton 
                value={selectedItems.length > 0 ? selectedItems : []}
                placeholder="Select multiple items"
                isActive={isOpen}
              />
            )}
            renderDropdown={(onRequestClose) => (
              <Dropdown>
                <DropdownHeader>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Multi-Select Categories</span>
                    {selectedItems.length > 0 && (
                      <button 
                        type="button"
                        onClick={clearSelection}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#007bff', 
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}>
                        Clear All
                      </button>
                    )}
                  </div>
                </DropdownHeader>
                
                {categoriesData.map((category) => {
                  const selectedInCategory = getSelectedByCategory(category.items);
                  return (
                    <DropdownItem
                      key={category.id}
                      submenuId={`multi-${category.id}`}
                      onSubmenuOpen={(id) => console.log('Opened multi-select submenu:', id)}
                      onSubmenuClose={(id) => console.log('Closed multi-select submenu:', id)}
                      submenu={
                        <Dropdown
                          isEmpty={getFilteredItems(category.id, category.items).length === 0}
                          renderEmptyState={() => (
                            <EmptyState
                              message="No results found. Try adjusting your search terms."
                            />
                          )}
                        >
                          <DropdownHeader
                            searchValue={submenuSearchValues[category.id] || ''}
                            searchPlaceholder={`Search ${category.name.toLowerCase()}...`}
                            onSearchChange={(newValue) => {
                              setSubmenuSearchValues(prev => ({
                                ...prev,
                                [category.id]: newValue
                              }));
                            }}>
                            {category.name} ({selectedInCategory} selected)
                          </DropdownHeader>
                            {getFilteredItems(category.id, category.items).map((item) => (
                              <DropdownItem 
                                key={item}
                                type="multi"
                                isSelected={selectedItems.includes(item)}
                                onClick={() => toggleItem(item)}>
                                {item}
                              </DropdownItem>
                            ))}
                        </Dropdown>
                      }>
                      <DropdownItemIcon 
                        color={palette.purple.shade40} 
                        iconName={category.icon as 'Archive' | 'Star' | 'Calendar'} 
                      />
                      {category.name}
                    </DropdownItem>
                  );
                })}
              </Dropdown>
            )}
          />
        </NestedDropdownProvider>
      </StyledDropdownWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const MultiSelectDropdown = MultiSelectTemplate.bind({});
MultiSelectDropdown.storyName = 'Multi-Select with Submenus';

// Left-aligned submenu example
const LeftAlignedTemplate: StoryFn = () => (
  <StyledWrapperDiv style={{ justifyContent: 'flex-end' }}>
    <StyledDropdownWrapperDiv>
      <NestedDropdownProvider
        config={{
          placement: 'left-start',
          openDelay: 150,
          closeDelay: 400
        }}>
        <DropdownCoordinator
          placement="bottom-start"
          renderButton={(isOpen, isDisabled, buttonRef) => (
            <DropdownButton 
              value="Left-Aligned Submenus"
              isActive={isOpen}
            />
          )}
          renderDropdown={(onRequestClose) => (
            <Dropdown>
              <DropdownHeading>Categories (Left-Aligned)</DropdownHeading>
              {categoriesData.map((category) => (
                <DropdownItem
                  key={category.id}
                  submenuId={`left-${category.id}`}
                  submenu={
                    <Dropdown>
                      <DropdownHeading>{category.name}</DropdownHeading>
                      {category.items.map((item) => (
                        <DropdownItem key={item} onClick={() => console.log('Selected:', item)}>
                          {item}
                        </DropdownItem>
                      ))}
                    </Dropdown>
                  }>
                  <DropdownItemIcon 
                    color={palette.purple.shade40} 
                    iconName={category.icon as 'Archive' | 'Star' | 'Calendar'} 
                  />
                  {category.name}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        />
      </NestedDropdownProvider>
    </StyledDropdownWrapperDiv>
  </StyledWrapperDiv>
);

export const LeftAlignedSubmenus = LeftAlignedTemplate.bind({});
LeftAlignedSubmenus.storyName = 'Left-Aligned Submenus';

// Performance test with many items
const PerformanceTemplate: StoryFn = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Generate large dataset
  const largeDataset = Array.from({ length: 10 }, (_, categoryIndex) => ({
    id: `category-${categoryIndex}`,
    name: `Category ${categoryIndex + 1}`,
    icon: 'Archive',
    items: Array.from({ length: 100 }, (__, itemIndex) => 
      `Item ${categoryIndex + 1}-${itemIndex + 1}`
    )
  }));

  const filteredData = largeDataset.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    category.items.length > 0
  );

  return (
    <StyledWrapperDiv>
      <StyledDropdownWrapperDiv>
        <NestedDropdownProvider>
          <DropdownCoordinator
            placement="bottom-start"
            renderButton={(isOpen, isDisabled, buttonRef) => (
              <DropdownButton 
                value="Performance Test (1000+ Items)"
                isActive={isOpen}
              />
            )}
            renderDropdown={(onRequestClose) => (
              <Dropdown>
                <DropdownHeader
                  searchValue={searchTerm}
                  searchPlaceholder="Search items..."
                  onSearchChange={setSearchTerm}>
                  Performance Test
                </DropdownHeader>
                
                {filteredData.map((category) => (
                  <DropdownItem
                    key={category.id}
                    submenuId={`perf-${category.id}`}
                    submenu={
                        <Dropdown maxHeight={400}>
                        <DropdownHeading>{category.name} ({category.items.length} items)</DropdownHeading>
                        {category.items.map((item) => (
                          <DropdownItem key={item} onClick={() => console.log('Selected:', item)}>
                            {item}
                          </DropdownItem>
                        ))}
                      </Dropdown>
                    }>
                    <DropdownItemIcon color={palette.orange.shade40} iconName="Archive" />
                    {category.name} ({category.items.length})
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          />
        </NestedDropdownProvider>
      </StyledDropdownWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const PerformanceTest = PerformanceTemplate.bind({});
PerformanceTest.storyName = 'Performance Test (Large Dataset)';