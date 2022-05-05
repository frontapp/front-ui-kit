import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {greys, palette} from '../../../helpers/colorHelpers';
import {fontSizes, fontWeights} from '../../../helpers/fontHelpers';
import {FrontUIKitStyleProvider} from '../../../utils/frontUIKitStyleProvider';
import {Icon, IconName, icons} from '../icon';

/*
 * Component.
 */

const StyledIconsContainerDiv = styled.div`
  max-width: 576px;
  margin: auto;
  width: 100%;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledIconDiv = styled.div`
  flex: 0 0 32px;
  padding: 4px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }
`;

const StyledCopiedDiv = styled.div`
  flex: 0 0 32px;
  padding: 4px;
  background: ${palette.green.shade40};
  border-radius: 8px;
`;

const StyledExplainerContainerDiv = styled.div`
  text-align: center;
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.semibold};
  margin-bottom: 32px;
`;

const ShowcaseComponent: FC = props => {
  const [copiedIconName, setCopiedIconName] = useState<string | undefined>();
  const onClick = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedIconName(name);
  };

  return (
    <FrontUIKitStyleProvider>
      <StyledExplainerContainerDiv>
        All available icons are listed below. You can click on an icon to copy the IconName for that component.
      </StyledExplainerContainerDiv>
      <StyledIconsContainerDiv onMouseEnter={() => setCopiedIconName(undefined)}>
        {Object.keys(icons).map(iconName => {
          if (copiedIconName && copiedIconName === iconName)
            return (
              <StyledCopiedDiv key={iconName} onMouseLeave={() => setCopiedIconName(undefined)}>
                <Icon name="Checkmark" size={32} color={greys.white} />
              </StyledCopiedDiv>
            );
          return (
            <StyledIconDiv key={iconName} onClick={() => onClick(iconName)}>
              <Icon name={iconName as IconName} size={32} />
            </StyledIconDiv>
          );
        })}
      </StyledIconsContainerDiv>
    </FrontUIKitStyleProvider>
  );
};

/*
 * Storybook.
 */

export default {
  title: 'Front UI Kit/Icons',
  component: ShowcaseComponent
} as ComponentMeta<typeof ShowcaseComponent>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseComponent> = () => <ShowcaseComponent />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
  controls: {hideNoControlsWarning: true}
};
