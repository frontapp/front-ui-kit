import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {useState} from 'react';

import {Tab} from '../tab';
import {TabGroup} from '../tabGroup';

export default {
  title: 'Front UI Kit/Tabs',
  component: TabGroup
} as ComponentMeta<typeof TabGroup>;

const tabs = [
  "Example Tab 1",
  "Example Tab 2",
  "Example Tab 3"
];

const Template: ComponentStory<typeof Tab> = args => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <TabGroup {...args}>
      {tabs.map(tab => (
        <Tab key={tab} name={tab} isSelected={tab === selectedTab} onClick={() => setSelectedTab(tab)} />
      ))}
    </TabGroup>
  );
};

export const Group = Template.bind({});
Group.args = {
  maxWidth: 400
};
