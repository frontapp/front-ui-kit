import {StoryFn} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {VisualSizesEnum} from '../../../../helpers/fontHelpers';
import {Heading, Paragraph} from '../../../../text';
import {Tab} from '../../tab';
import {TabGroup} from '../../tabGroup';

const StyledWrapperDiv = styled.div`
  display: flex;
  flex-flow: column;
  gap: 40px;
  padding: 20px;
`;

const StyledSectionDiv = styled.div`
  display: flex;
  flex-flow: column;
  gap: 20px;
`;

const StyledTabGroupWrapper = styled.div`
  width: 400px;
`;

const StyledConfigWrapper = styled.div`
  display: flex;
  flex-flow: column;
  gap: 10px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const tabs = ['Tab 1', 'Tab 2', 'Tab 3'];

interface TabConfiguration {
  title: string;
  description: string;
  marginBottom?: number;
  selectedIndicatorHeight?: number;
  selectedIndicatorWidth?: string;
}

const configurations: TabConfiguration[] = [
  {
    title: 'Default Configuration',
    description:
      'marginBottom: 11px (default), selectedIndicatorHeight: 4px (default), selectedIndicatorWidth: 50% (default)'
  },
  {
    title: 'Custom Margin Bottom',
    description: 'marginBottom: 6px, selectedIndicatorHeight: 2px, selectedIndicatorWidth: 50% (default)',
    marginBottom: 6,
    selectedIndicatorHeight: 2
  },
  {
    title: 'Custom Selected Indicator Height',
    description:
      'marginBottom: 11px (default), selectedIndicatorHeight: 8px, selectedIndicatorWidth: 50% (default)',
    selectedIndicatorHeight: 8
  },
  {
    title: 'Custom Selected Indicator Width',
    description:
      'marginBottom: 11px (default), selectedIndicatorHeight: 4px (default), selectedIndicatorWidth: 80%',
    selectedIndicatorWidth: '80%'
  },
  {
    title: 'Custom All Properties',
    description: 'marginBottom: 15px, selectedIndicatorHeight: 6px, selectedIndicatorWidth: 30%',
    marginBottom: 15,
    selectedIndicatorHeight: 6,
    selectedIndicatorWidth: '30%'
  }
];

const Template: StoryFn<typeof Tab> = () => {
  const [selectedTabs, setSelectedTabs] = useState<Record<string, string>>(
    configurations.reduce(
      (acc, _, index) => {
        const [firstTab] = tabs;
        acc[`config-${index}`] = firstTab;
        return acc;
      },
      {} as Record<string, string>
    )
  );

  const handleTabClick = (configIndex: number, tabName: string) => {
    setSelectedTabs((prev) => ({
      ...prev,
      [`config-${configIndex}`]: tabName
    }));
  };

  return (
    <StyledWrapperDiv>
      {configurations.map((config, index) => (
        <StyledSectionDiv key={config.title}>
          <Heading size={VisualSizesEnum.MEDIUM}>{config.title}</Heading>
          <StyledConfigWrapper>
            <Paragraph color="#666">{config.description}</Paragraph>
            <StyledTabGroupWrapper>
              <TabGroup>
                {tabs.map((tab) => (
                  <Tab
                    key={tab}
                    name={tab}
                    isSelected={tab === selectedTabs[`config-${index}`]}
                    onClick={() => handleTabClick(index, tab)}
                    marginBottom={config.marginBottom}
                    selectedIndicatorHeight={config.selectedIndicatorHeight}
                    selectedIndicatorWidth={config.selectedIndicatorWidth}
                  />
                ))}
              </TabGroup>
            </StyledTabGroupWrapper>
          </StyledConfigWrapper>
        </StyledSectionDiv>
      ))}
    </StyledWrapperDiv>
  );
};

export const Configurations = Template.bind({});
