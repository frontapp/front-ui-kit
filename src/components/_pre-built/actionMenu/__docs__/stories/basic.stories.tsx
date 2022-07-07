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

const StyledStoryWrapperDiv = styled.div`
  height: 215px;
  display: flex;
  justify-content: center;
`;

const StyledMenuWrapperDiv = styled.div`
  display: flex;
  flex-flow: row-reverse;
  width: 250px;
  height: 30px;
  padding: 8px;
  border-radius: 8px;
  background: white;
  border: 1px solid ${greys.shade30};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

/*
 * Story.
 */

const Template: ComponentStory<typeof ActionMenu> = () => (
  <StyledStoryWrapperDiv>
    <StyledMenuWrapperDiv>
      <ActionMenu layerRootId="story--components-action-menu--basic">
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
  </StyledStoryWrapperDiv>
);

export const Basic = Template.bind({});
