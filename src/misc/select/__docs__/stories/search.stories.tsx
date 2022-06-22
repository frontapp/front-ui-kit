import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Select} from '../../select';
import {SelectItem} from '../../selectItem';

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

const items = [
  {display: 'Example Item 1', id: '1'},
  {display: 'Example Item 2', id: '2'},
  {display: 'Example Item 3', id: '3'},
  {display: 'Example Item 4', id: '4'},
  {display: 'Example Item 5', id: '5'}
];

const Template: ComponentStory<typeof Select> = args => {
  const [selectedItemId, setSelectedItemId] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [itemsToDisplay, setItemsToDisplay] = useState<ReadonlyArray<{display: string, id: string}>>(items);
  return (
    <StyledWrapperDiv>
      <StyledMenuWrapperDiv>
        <Select
          {...args}
          selectedValues={items.find(item => item.id === selectedItemId)?.display}
          searchValue={searchValue}
          onSearchChange={value => {
            setSearchValue(value);
            setItemsToDisplay(items.filter(item => item.display.toLowerCase().includes(value.toLocaleLowerCase())));
          }}
          onSelectClosed={() => {
            setItemsToDisplay(items);
            setSearchValue('');
          }}
          layerRootId="story--components-select--search"
        >
          {itemsToDisplay.map(item => (
            <SelectItem key={item.id} onClick={() => setSelectedItemId(item.id)} isSelected={item.id === selectedItemId}>
              {item.display}
            </SelectItem>
          ))}
        </Select>
      </StyledMenuWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const Search = Template.bind({});
Search.args = {
  headerLabel: "Simple Search Select",
  maxHeight: 200
};
