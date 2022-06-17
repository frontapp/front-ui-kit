import {ComponentMeta, ComponentStory} from '@storybook/react';
import _ from 'lodash';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Select} from '../select';
import {SelectItem} from '../selectItem';
import {disabledSelectStoryFields} from './selectStoryHelpers';

export default {
  title: 'Misc/Select',
  component: Select,
  argTypes: {
    ...disabledSelectStoryFields
  }
} as ComponentMeta<typeof Select>;

const StyledMenuWrapperDiv = styled.div`
  padding: 8px;
  border-radius: 8px;
  background: white;
  max-width: 350px;
`;

const items = [
  {display: 'Example Item 1', id: '1'},
  {display: 'Example Item 2', id: '2'},
  {display: 'Example Item 3', id: '3'},
  {display: 'Example Item 4', id: '4'},
  {display: 'Example Item 5', id: '5'}
];

const Template: ComponentStory<typeof Select> = args => {
  const [selectedItemIds, setSelectedItemIds] = useState<ReadonlyArray<string>>([]);
  return (
    <StyledMenuWrapperDiv>
      <Select {...args} selectedValues={_(selectedItemIds.map(id => items.find(i => i.id === id)?.display)).compact().value()}>
        {items.map(item => (
          <SelectItem
            key={item.id}
            type="multi"
            isSelected={selectedItemIds.includes(item.id)}
            onClick={() => setSelectedItemIds(itemIds => {
              if (itemIds?.includes(item.id))
                return itemIds.filter(id => id !== item.id);
              return [
                ...itemIds,
                item.id
              ];
            })}
          >
            {item.display}
          </SelectItem>
        ))}
      </Select>
    </StyledMenuWrapperDiv>
  );
};

export const SimpleMulti = Template.bind({});
