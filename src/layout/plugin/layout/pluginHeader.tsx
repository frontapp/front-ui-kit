import React, {FC, MouseEventHandler} from 'react';
import styled, {css} from 'styled-components';

import {Button} from '../../../components/button/button';
import {Input} from '../../../elements';
import {Icon} from '../../../elements/icon/icon';
import {greys} from '../../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../../helpers/fontHelpers';

/*
 * Props.
 */

interface PluginHeaderProps {
  /** Content to render for the header. */
  children: React.ReactNode;
  /** Actions that will be rendered to the right of the content. */
  actions?: React.ReactNode;
  /** Controls if we are on a sub-page. If not passed in we will assume we are at a top level. */
  onBackClick?: MouseEventHandler;
  search?: {
    query: string;
    onChange: (query: string) => void;
  };
}

/*
 * Style.
 */

const StyledPluginHeaderWrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledPluginHeaderContentWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  font-family: ${fonts.system};
  grid-area: plugin-header;
  height: 40px;
  flex-flow: row;
`;

interface StyledPluginTitleDivProps {
  $isSubPage: boolean;
}

const StyledPluginTitleDiv = styled.div<StyledPluginTitleDivProps>`
  display: flex;
  flex-flow: row;
  align-items: center;
  flex: 1;
  color: ${greys.shade90};
  font-weight: ${fontWeights.medium};
  font-size: ${fontSizes.medium};
  justify-content: center;

  ${p =>
    p.$isSubPage &&
    css`
      color: ${greys.shade70};
      font-weight: ${fontWeights.semibold};
      font-size: ${fontSizes.medium};
    `};
`;

const StyledButtonWrapperDiv = styled.div`
  margin-right: -8px;
  padding-left: 8px;
  display: flex;
  flex-flow: row;
  align-items: center;
`;

const StyledActionsWrapperDiv = styled.div`
  padding: 0 8px;
  display: flex;
  flex-flow: row;
  align-items: center;
`;

const StyledSearchWrapper = styled.div`
  padding: 12px;
  padding-top: 0;
`;

/*
 * Component.
 */

export const PluginHeader: FC<PluginHeaderProps> = props => {
  const {children, onBackClick, actions, search} = props;
  return (
    <StyledPluginHeaderWrapperDiv>
      <StyledPluginHeaderContentWrapperDiv>
        {maybeRenderBackButton(onBackClick)}
        <StyledPluginTitleDiv $isSubPage={Boolean(onBackClick)}>{children}</StyledPluginTitleDiv>
        {maybeRenderActions(actions)}
      </StyledPluginHeaderContentWrapperDiv>
      <StyledSearchWrapper>
        {search && <Input iconName="Search" value={search.query} onChange={search.onChange} />}
      </StyledSearchWrapper>
    </StyledPluginHeaderWrapperDiv>
  );
};

/*
 * Helpers.
 */

function maybeRenderBackButton(onBackClick?: MouseEventHandler) {
  if (!onBackClick)
    return null;
  return (
    <StyledButtonWrapperDiv>
      <Button type="icon" onClick={onBackClick}>
        <Icon name="ChevronLeft" />
      </Button>
    </StyledButtonWrapperDiv>
  );
}

function maybeRenderActions(actions?: React.ReactNode) {
  if (!actions)
    return null;
  return <StyledActionsWrapperDiv>{actions}</StyledActionsWrapperDiv>;
}
