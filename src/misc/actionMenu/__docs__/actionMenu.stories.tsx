import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {ActionMenu} from '../actionMenu';
import {ActionMenuItem} from '../actionMenuItem';
import {ActionMenuItemSpacer} from '../actionMenuItemSpacer';

export default {
  title: 'Misc/ActionMenu',
  component: ActionMenu
} as ComponentMeta<typeof ActionMenu>;

const StyledMenuWrapperDiv = styled.div`
  display: flex;
  flex-flow: row-reverse;
  width: 250px;
  padding: 8px;
  border-radius: 8px;
  background: white;
`;

const Template: ComponentStory<typeof ActionMenu> = args => (
  <StyledMenuWrapperDiv>
    <ActionMenu {...args}>
      <ActionMenuItem iconName="Assign">
        Merge Contact
      </ActionMenuItem>
      <ActionMenuItem iconName="Copy">
        Copy Account Id
      </ActionMenuItem>
      <ActionMenuItem>
        Extra Long Name For A Dropdown
      </ActionMenuItem>
      <ActionMenuItemSpacer />
      <ActionMenuItem iconName="Preferences">
        Super long name dropdown item that should cause the tooltip to wrap when hovered over.
      </ActionMenuItem>
      <ActionMenuItem iconName="Close">
        Close
      </ActionMenuItem>
    </ActionMenu>
  </StyledMenuWrapperDiv>
);

export const Simple = Template.bind({});
