import type { StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

import { Dropdown } from '../../dropdown';
import { DropdownButton } from '../../dropdownButton';
import { DropdownCoordinator } from '../../dropdownCoordinator';
import { DropdownItem } from '../../dropdownItem';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 225px;
`;

const StyledDropdownWrapperDiv = styled.div`
  width: 300px;
`;

const itemsToRender = Array.from(Array(1000).keys());

const Template: StoryFn<typeof DropdownCoordinator> = () => {
  const [selectedItemId, setSelectedItemId] = useState<number>();
  return (
    <StyledWrapperDiv>
      <StyledDropdownWrapperDiv>
        <DropdownCoordinator
          layerRootId="story--elements-dropdown--simple"
          placement="bottom-start"
          renderButton={(isDropdownOpen, isDisabled, buttonRef) => (
            <DropdownButton
              buttonRef={buttonRef}
              isDisabled={isDisabled}
              value={typeof selectedItemId !== 'undefined' ? `Dropdown Item: ${selectedItemId}` : ''}
              isActive={isDropdownOpen}
              placeholder="Select an option"
            />
          )}
          renderDropdown={(_onRequestClose, buttonWidth) => (
            <Dropdown maxWidth={buttonWidth} maxHeight={200}>
              {itemsToRender.map((itemId) => (
                <DropdownItem
                  key={itemId}
                  onClick={() => setSelectedItemId(itemId)}
                  isSelected={itemId === selectedItemId}>
                  Dropdown Item: {itemId}
                </DropdownItem>
              ))}
            </Dropdown>
          )}
        />
      </StyledDropdownWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const Simple = Template.bind({});
