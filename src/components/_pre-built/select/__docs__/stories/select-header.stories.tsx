import {StoryFn} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Select} from '../../select';
import {SelectItem} from '../../selectItem';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 260px;
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

const Template: StoryFn<typeof Select> = (args) => {
  const [selectedItemId, setSelectedItemId] = useState<string>();
  return (
    <StyledWrapperDiv>
      <StyledMenuWrapperDiv>
        <Select
          {...args}
          selectedValues={items.find((item) => item.id === selectedItemId)?.display}
          layerRootId="story--components-select--select-header">
          {items.map((item) => (
            <SelectItem
              key={item.id}
              onClick={() => setSelectedItemId(item.id)}
              isSelected={item.id === selectedItemId}>
              {item.display}
            </SelectItem>
          ))}
        </Select>
      </StyledMenuWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const SelectHeader = Template.bind({});
SelectHeader.args = {
  headerLabel: 'Simple Select'
};
