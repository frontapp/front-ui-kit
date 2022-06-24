import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {greys} from '../../../../../helpers/colorHelpers';
import {ActionMenu} from '../../actionMenu';
import {ActionMenuItem} from '../../actionMenuItem';
import {ActionMenuItemSpacer} from '../../actionMenuItemSpacer';

/*
 * Styles.
 */

const StyledMenuWrapperDiv = styled.div`
  display: flex;
  flex-flow: row-reverse;
  width: 250px;
  padding: 8px;
  border-radius: 8px;
  background: white;
  border: 1px solid ${greys.shade30};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

/*
 * Story.
 */

const Template: ComponentStory<typeof ActionMenu> = args => (
  <StyledMenuWrapperDiv>
    <ActionMenu {...args}>
      <ActionMenuItem iconName="Assign">Merge Contact</ActionMenuItem>
      <ActionMenuItem iconName="Copy">Copy Account Id</ActionMenuItem>
      <ActionMenuItem>Extra Long Name For A Dropdown</ActionMenuItem>
      <ActionMenuItemSpacer />
      <ActionMenuItem iconName="Preferences">
        Super long name dropdown item that should cause the tooltip to wrap when hovered over.
      </ActionMenuItem>
      <ActionMenuItem iconName="Close">Close</ActionMenuItem>
    </ActionMenu>
  </StyledMenuWrapperDiv>
);

export const Basic = Template.bind({});
