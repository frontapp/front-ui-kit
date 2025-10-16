import {StoryObj} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {Tab} from '../../../../../components/tab/tab';
import {TabGroup} from '../../../../../components/tab/tabGroup';
import {greys} from '../../../../../helpers/colorHelpers';
import {DefaultStyleProvider} from '../../../../../utils/defaultStyleProvider';
import {PluginFooter} from '../../pluginFooter';
import {PluginHeader} from '../../pluginHeader';
import {PluginLayout} from '../../pluginLayout';

const StyledCenteredDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const StyledLayoutWrapperDiv = styled.div`
  width: 400px;
  height: 600px;
  background: ${greys.white};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border: 1px solid ${greys.shade30};
`;

const StyledTabsContainerDiv = styled.div`
  padding: 16px 16px 0 16px;
`;

const StyledPluginContentDiv = styled.div`
  padding: 16px;
  white-space: pre-wrap;
`;

const tabs = ['Overview', 'Tasks', 'Notes'];

const tabContent = {
  Overview: `Overview Tab Content
  
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mattis lorem, id varius sem. Praesent commodo eu ex sit amet cursus.`,
  Tasks: `Tasks Tab Content

Donec dictum ut odio at auctor. In laoreet nisi id quam pharetra, in porttitor quam finibus. Donec risus eros, fermentum ac metus at, lobortis facilisis nunc.`,
  Notes: `Notes Tab Content

Sed gravida ullamcorper nisl. Donec tempus tempus dolor, vel auctor odio gravida iaculis. Ut facilisis sem et sem faucibus, sed ultricies justo tempus.`
};

const Template = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <StyledCenteredDiv>
      <DefaultStyleProvider>
        <StyledLayoutWrapperDiv>
          <PluginLayout>
            <PluginHeader>Plugin with Tabs</PluginHeader>
            <StyledTabsContainerDiv>
              <TabGroup maxWidth={280}>
                {tabs.map((tab) => (
                  <Tab
                    key={tab}
                    name={tab}
                    isSelected={tab === selectedTab}
                    onClick={() => setSelectedTab(tab)}
                    maxWidth={70}
                  />
                ))}
              </TabGroup>
            </StyledTabsContainerDiv>
            <StyledPluginContentDiv>
              {tabContent[selectedTab as keyof typeof tabContent]}
            </StyledPluginContentDiv>
            <PluginFooter>Plugin Footer</PluginFooter>
          </PluginLayout>
        </StyledLayoutWrapperDiv>
      </DefaultStyleProvider>
    </StyledCenteredDiv>
  );
};

export const Tabs: StoryObj<typeof PluginLayout> = {
  render: () => <Template />
};
