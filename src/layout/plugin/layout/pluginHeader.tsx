import React, {FC, MouseEventHandler} from 'react';
import styled, {css} from 'styled-components';

import {Button} from '../../../components/button/button';
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
}

/*
 * Style.
 */

const StyledPluginHeaderWrapperDiv = styled.div`
  display: flex;
  flex-flow: row;
  font-family: ${fonts.system};
  grid-area: plugin-header;
  height: 56px;
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
  font-weight: ${fontWeights.bold};
  font-size: ${fontSizes.large};
  padding-left: 16px;

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

/*
 * Component.
 */

export const PluginHeader: FC<PluginHeaderProps> = props => {
  const {children, onBackClick, actions} = props;
  return (
    <StyledPluginHeaderWrapperDiv>
      {maybeRenderBackButton(onBackClick)}
      <StyledPluginTitleDiv $isSubPage={Boolean(onBackClick)}>{children}</StyledPluginTitleDiv>
      {maybeRenderActions(actions)}
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
