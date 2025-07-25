import {StoryFn} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {greys} from '../../../../../helpers/colorHelpers';
import {ActionMenu} from '../../actionMenu';
import {ActionMenuItem} from '../../actionMenuItem';
import {ActionMenuItemSpacer} from '../../actionMenuItemSpacer';

const StyledStoryWrapperDiv = styled.div`
  height: 215px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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
  position: relative;
`;

const Template: StoryFn<typeof ActionMenu> = () => (
  <StyledStoryWrapperDiv>
    <StyledMenuWrapperDiv>
      <ActionMenu>
        <ActionMenuItem iconName="Assign" onClick={() => console.log('Merge Contact clicked')}>
          Merge Contact
        </ActionMenuItem>
        <ActionMenuItem iconName="Copy" onClick={() => console.log('Copy Account Id clicked')}>
          Copy Account Id
        </ActionMenuItem>
        <ActionMenuItem onClick={() => console.log('Extra Long Name clicked')}>
          Extra Long Name For A Dropdown
        </ActionMenuItem>
        <ActionMenuItemSpacer />
        <ActionMenuItem iconName="Preferences" onClick={() => console.log('Preferences clicked')}>
          Super long name dropdown item that should cause the tooltip to wrap when hovered over.
        </ActionMenuItem>
        <ActionMenuItem iconName="Close" onClick={() => console.log('Close clicked')}>
          Close
        </ActionMenuItem>
      </ActionMenu>
    </StyledMenuWrapperDiv>
  </StyledStoryWrapperDiv>
);

export const Basic = Template.bind({});
