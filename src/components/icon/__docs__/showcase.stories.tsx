import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {greys, palette} from '../../../helpers/colorHelpers';
import {fontSizes, fontWeights} from '../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
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
  padding: 2px 4px 4px 4px;
  background: ${palette.green.shade40};
  border-radius: 8px;
  align-items: center;
  display: flex;
  flex-flow: column;
`;

const StyledExplainerContainerDiv = styled.div`
  text-align: center;
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.semibold};
  margin-bottom: 32px;
`;

const StyledCopiedTextDiv = styled.div`
  color: white;
  font-size: 8px;
`;

const StyledIconsHeaderDiv = styled.div`
  font-size: ${fontSizes.large};
  margin: 24px auto 16px auto;
  max-width: 576px;
  font-weight: ${fontWeights.medium};
  color: ${greys.shade80};
`;

const ShowcaseComponent: FC = props => {
  const [copiedIconName, setCopiedIconName] = useState<string | undefined>();

  const onIconCopied = (name?: string) => {
    if (!name) {
      setCopiedIconName(undefined);
      return;
    }
    navigator.clipboard.writeText(name);
    setCopiedIconName(name);
  };

  return (
    <DefaultStyleProvider>
      <StyledExplainerContainerDiv>
        All available icons are listed below. You can click on an icon to copy the IconName for that component.
      </StyledExplainerContainerDiv>
      <StyledIconsHeaderDiv>
        Generic Icons
      </StyledIconsHeaderDiv>
      {renderIcons(
        Object.keys(icons).filter(iconName => !iconName.includes('Attachment')),
        copiedIconName,
        onIconCopied
      )}
      <StyledIconsHeaderDiv>
        Attachment Icons, color overwriting not supported.
      </StyledIconsHeaderDiv>
      {renderIcons(
        Object.keys(icons).filter(iconName => iconName.includes('Attachment')),
        copiedIconName,
        onIconCopied
      )}
    </DefaultStyleProvider>
  );
};

function renderIcons(iconNames: ReadonlyArray<string>, copiedIconName: string, onIconCopied: (iconName?: string) => void) {
  return (
    <StyledIconsContainerDiv>
      {iconNames.map(iconName => {
        if (copiedIconName && copiedIconName === iconName)
          return (
            <StyledCopiedDiv key={iconName} onMouseLeave={() => onIconCopied(undefined)}>
              <Icon name="Checkmark" size={22} color={greys.white} />
              <StyledCopiedTextDiv>Copied</StyledCopiedTextDiv>
            </StyledCopiedDiv>
          );
        return (
          <StyledIconDiv key={iconName} onClick={() => onIconCopied(iconName)}>
            <Icon name={iconName as IconName} size={32} />
          </StyledIconDiv>
        );
      })}
    </StyledIconsContainerDiv>
  );
}

/*
 * Storybook.
 */

export default {
  title: 'Components/Icons',
  component: ShowcaseComponent
} as ComponentMeta<typeof ShowcaseComponent>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseComponent> = () => <ShowcaseComponent />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
  controls: {hideNoControlsWarning: true}
};
