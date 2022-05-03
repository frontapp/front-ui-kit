import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {greys} from '../../../helpers/colorHelpers';
import {fonts} from '../../../helpers/fontHelpers';
import {DropdownCoordinator} from '../dropdownCoordinator';
import {RepositionPopover} from '../repositionPopover';

export default {
  title: 'Front UI Kit/Dropdown',
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
        renderButton={() => <StyledButton type="button">Dropdown Without Background</StyledButton>}
        renderDropdown={onRequestClose => (
          <RepositionPopover
            onRequestClose={onRequestClose}
            isExclusive
            isInteractive
            placement="bottom-start"
          >
            <StyledDropdownDiv>
              Example Dropdown
            </StyledDropdownDiv>
          </RepositionPopover>
        )}
      />
    </StyledDropdownContainerDiv>
    <br />
    <StyledDropdownContainerDiv>
      <DropdownCoordinator
        {...args}
        renderButton={() => <StyledButton type="button">Dropdown With Background</StyledButton>}
        renderDropdown={onRequestClose => (
          <RepositionPopover
            onRequestClose={onRequestClose}
            isExclusive
            isInteractive
            hasBackground
            placement="bottom-start"
          >
            <StyledDropdownDiv>
              Example Dropdown
            </StyledDropdownDiv>
          </RepositionPopover>
        )}
      />
    </StyledDropdownContainerDiv>
    <br />
    <StyledDropdownContainerDiv>
      <DropdownCoordinator
        {...args}
        renderButton={() => <StyledButton type="button">Dropdown Close Action</StyledButton>}
        renderDropdown={onRequestClose => (
          <RepositionPopover
            isExclusive
            isInteractive
            hasBackground
            placement="bottom-start"
          >
            <StyledDropdownDiv>
              This dropdown will not close when the background is clicked.
              <br />
              <br />
              <StyledButton type="button" onClick={onRequestClose}>Close</StyledButton>
            </StyledDropdownDiv>
          </RepositionPopover>
        )}
      />
    </StyledDropdownContainerDiv>
  </>

);

export const Coordinator = Template.bind({});
