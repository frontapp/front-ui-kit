import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';
import {fonts, VisualSizesEnum} from '../../../helpers/fontHelpers';
import {Button} from '../../button/button';
import {DropdownCoordinator} from '../dropdownCoordinator';

export default {
  title: 'Components/Dropdown',
  component: DropdownCoordinator
} as ComponentMeta<typeof DropdownCoordinator>;

const StyledDropdownContainerDiv = styled.div`
  text-align: center;
`;

const StyledDropdownDiv = styled.div`
  font-family: ${fonts.system};
  padding: 8px;
  border-radius: 8px;
  background: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border: 1px solid ${greys.shade40};
  max-width: 300px;
`;

const StyledButton = styled.button`
  font-family: ${fonts.system};
`;

const Template: ComponentStory<typeof DropdownCoordinator> = args => (
  <>
    <StyledDropdownContainerDiv>
      <DropdownCoordinator
        {...args}
        placement="bottom-start"
        renderButton={() => <Button>Dropdown Without Overlay</Button>}
        renderDropdown={() => (
          <StyledDropdownDiv>
            Example Dropdown
          </StyledDropdownDiv>
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
          <StyledDropdownDiv>
            Example Dropdown
          </StyledDropdownDiv>
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
          <StyledDropdownDiv>
            This dropdown will not close when the background is clicked.
            <br />
            <br />
            <Button onClick={onCloseDropdown} size={VisualSizesEnum.SMALL}>Close</Button>
          </StyledDropdownDiv>
        )}
      />
    </StyledDropdownContainerDiv>
  </>

);

export const Coordinator = Template.bind({});
