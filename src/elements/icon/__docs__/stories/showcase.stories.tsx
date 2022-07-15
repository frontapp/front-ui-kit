import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {Tooltip} from '../../../../components/tooltip/tooltip';
import {TooltipCoordinator} from '../../../../components/tooltip/tooltipCoordinator';
import {greys, palette} from '../../../../helpers/colorHelpers';
import {fontSizes} from '../../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../../utils/defaultStyleProvider';
import {Icon, IconName} from '../../icon';
/*
 * Props.
 */

interface IconShowcaseProps {
  iconNames: ReadonlyArray<string>;
}

/*
 * Style.
 */

const StyledIconsContainerDiv = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledIconWrapperDiv = styled.div`
  flex: 0 0 10%;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 8px 0;
  overflow: hidden;
`;

const StyledIconDiv = styled.div`
  width: 32px;
  padding: 4px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }
`;

const StyledCopiedDiv = styled.div`
  width: 32px;
  height: 34px;
  padding: 2px 4px 4px 4px;
  background: ${palette.green.shade40};
  border-radius: 8px;
  align-items: center;
  display: flex;
  flex-flow: column;
`;

const StyledIconNameDiv = styled.div`
  text-align: center;
  font-size: ${fontSizes.veryTiny};
  color: ${greys.shade70};
  margin-top: 8px;
  overflow: hidden;
  width: 100%;
`;

const StyledCopiedTextDiv = styled.div`
  color: white;
  font-size: 8px;
`;

/*
 * Component.
 */

export const IconShowcase: FC<IconShowcaseProps> = props => {
  const {iconNames} = props;
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
      <StyledIconsContainerDiv>
        {iconNames.map(iconName => {
          if (copiedIconName && copiedIconName === iconName)
            return (
              <StyledIconWrapperDiv key={iconName}>
                <StyledCopiedDiv onMouseLeave={() => onIconCopied(undefined)}>
                  <Icon name="Checkmark" size={22} color={greys.white} />
                  <StyledCopiedTextDiv>Copied</StyledCopiedTextDiv>
                </StyledCopiedDiv>
                <StyledIconNameDiv>{iconName}</StyledIconNameDiv>
              </StyledIconWrapperDiv>
            );
          return (
            <StyledIconWrapperDiv key={iconName}>
              <StyledIconDiv onClick={() => onIconCopied(iconName)}>
                <Icon name={iconName as IconName} size={32} />
              </StyledIconDiv>
              <StyledIconNameDiv>
                <TooltipCoordinator
                  condition={{type: 'overflow'}}
                  renderTooltip={() => <Tooltip>{iconName}</Tooltip>}
                >
                  {iconName}
                </TooltipCoordinator>
              </StyledIconNameDiv>
            </StyledIconWrapperDiv>
          );
        })}
      </StyledIconsContainerDiv>
    </DefaultStyleProvider>
  );
};
