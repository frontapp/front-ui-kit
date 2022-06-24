import React, {FC} from 'react';
import styled from 'styled-components';

import {renderChildrenIgnoreSpecifiedComponents, renderChildrenSpecifiedComponents} from '../../../helpers/renderHelpers';

/*
 * Props.
 */

interface PluginLayoutProps {
  /** Content to render for the plugin. */
  children: React.ReactNode;
}

/*
 * Style.
 */

const StyledPluginLayoutWrapperDiv = styled.div`
  height: 100%;
  display: grid;
  grid-template-areas: "plugin-header"
                       "plugin-content"
                       "plugin-footer";
  grid-template-rows: auto 1fr auto;
`;

const StyledPluginContentWrapperDiv = styled.div`
  grid-area: plugin-content;
  overflow: auto;
`;

/*
 * Component.
 */

export const PluginLayout: FC<PluginLayoutProps> = ({children}) => (
  <StyledPluginLayoutWrapperDiv>
    {renderChildrenSpecifiedComponents(children, ['PluginHeader', 'PluginFooter'])}
    <StyledPluginContentWrapperDiv>
      {renderChildrenIgnoreSpecifiedComponents(children, ['PluginHeader', 'PluginFooter'])}
    </StyledPluginContentWrapperDiv>
  </StyledPluginLayoutWrapperDiv>
);
