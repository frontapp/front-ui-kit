import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Tab} from '../../tab';
import {TabGroup} from '../../tabGroup';

const tabs = [
  "Example Tab 1",
  "Example Tab 2",
  "Example Tab 3"
];

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const StyledTabWrapperDiv = styled.div`
  width: 350px;
`;

const Template: ComponentStory<typeof Tab> = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <StyledWrapperDiv>
      <StyledTabWrapperDiv>
        <TabGroup>
          {tabs.map(tab => (
            <Tab key={tab} name={tab} isSelected={tab === selectedTab} onClick={() => setSelectedTab(tab)} />
          ))}
        </TabGroup>
      </StyledTabWrapperDiv>
    </StyledWrapperDiv>
  );
};

export const BasicGroup = Template.bind({});
