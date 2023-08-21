/* eslint-disable @typescript-eslint/no-explicit-any */
import {ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {Icon, IconName} from '../../../../elements/icon/icon';
import {Pill} from '../../pill';
import {PillContentIcon} from '../../pillContentIcon';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const IconTemplate: ComponentStory<typeof Pill & {iconName: IconName}> = (args) => (
  <StyledWrapperDiv>
    <Pill>
      Example Pill
      <PillContentIcon>
        <Icon name="ArchiveFilled" />
      </PillContentIcon>
    </Pill>
  </StyledWrapperDiv>
);
export const IconPill = IconTemplate.bind({});
