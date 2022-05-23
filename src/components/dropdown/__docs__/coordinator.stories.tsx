import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {VisualSizesEnum} from '../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Button} from '../../button/button';
import {Dropdown} from '../dropdown';
import {DropdownCoordinator} from '../dropdownCoordinator';
import {DropdownFooter} from '../dropdownFooter';
import {DropdownItem} from '../dropdownItem';

export default {
  title: 'Components/Dropdown',
  component: DropdownCoordinator
} as ComponentMeta<typeof DropdownCoordinator>;

const StyledDropdownContainerDiv = styled.div`
  text-align: center;
`;

const StyledDropdownFooterDiv = styled.div`
  text-align: right;
`;

const Template: ComponentStory<typeof DropdownCoordinator> = args => (
  <DefaultStyleProvider>
    <StyledDropdownContainerDiv>
      <DropdownCoordinator
        {...args}
        placement="bottom-start"
        renderButton={() => <Button>Dropdown Without Overlay</Button>}
        renderDropdown={() => (
          <Dropdown>
            <DropdownItem>Example Dropdown</DropdownItem>
          </Dropdown>
        )}
      />
    </StyledDropdownContainerDiv>
    <br />
    <StyledDropdownContainerDiv>
      <DropdownCoordinator
        {...args}
        hasVisibleOverlay
        placement="bottom-start"
        renderButton={() => <Button>Dropdown With Overlay</Button>}
        renderDropdown={() => (
          <Dropdown>
            <DropdownItem>Example Dropdown</DropdownItem>
          </Dropdown>
        )}
      />
    </StyledDropdownContainerDiv>
    <br />
    <StyledDropdownContainerDiv>
      <DropdownCoordinator
        {...args}
        isOverlayCloseDisabled
        placement="bottom-start"
        renderButton={() => <Button>Dropdown Close Action</Button>}
        renderDropdown={onCloseDropdown => (
          <Dropdown>
            <DropdownItem onClick={onCloseDropdown}>This dropdown will not</DropdownItem>
            <DropdownItem onClick={onCloseDropdown}>close when the overlay is</DropdownItem>
            <DropdownItem onClick={onCloseDropdown}>clicked.</DropdownItem>
            <DropdownFooter>
              <StyledDropdownFooterDiv>
                <Button onClick={onCloseDropdown} size={VisualSizesEnum.SMALL}>Close</Button>
              </StyledDropdownFooterDiv>
            </DropdownFooter>
          </Dropdown>
        )}
      />
    </StyledDropdownContainerDiv>
  </DefaultStyleProvider>

);

export const CoordinatorExamples = Template.bind({});
