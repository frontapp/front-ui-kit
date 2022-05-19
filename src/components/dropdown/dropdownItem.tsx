import {ellipsis} from 'polished';
import React, {FC, MouseEventHandler} from 'react';
import styled from 'styled-components';

import {alphas, greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes} from '../../helpers/fontHelpers';
import {renderChildrenIgnoreSpecifiedComponents, renderChildrenSpecifiedComponents} from '../../helpers/renderHelpers';

/*
 * Constants.
 */

const nonDropdownContentComponents = ['DropdownItemIcon', 'DropdownItemAvatar'];

/*
 * Props.
 */

export interface DropdownItemProps {
  /** Content to render. */
  children: React.ReactNode;
  /** Height of the content, this is only used for the dropdowns internal logic. This will be auto-calculated if not specified. */
  height?: number;
  /** Called when the dropdown item is clicked. */
  onClick?: MouseEventHandler;
}

/*
 * Style.
 */

const StyledDropdownItemWrapperDiv = styled.div`
  display: grid;
  grid-template-areas: "left-content content right-content";
  grid-template-columns: min-content 1fr min-content;
  height: 100%;
  padding: 0 12px;
  align-items: center;

  &:hover {
    background: ${alphas.gray10};
  }
`;

const StyledDropdownItemContentWrapperDiv = styled.div`
  font-family: ${fonts.system};
  grid-area: content;
  color: ${greys.shade80};
  cursor: default;
  line-height: 16px;
  font-size: ${fontSizes.medium};
  ${ellipsis()};
`;

/*
 * Component.
 */

export const DropdownItem: FC<DropdownItemProps> = props => {
  const {children, onClick} = props;

  return (
    <StyledDropdownItemWrapperDiv onClick={onClick}>
      {/* Render non-content items. Avatar, icons, etc. */}
      {renderChildrenSpecifiedComponents(children, nonDropdownContentComponents)}
      {/* Render content items. */}
      <StyledDropdownItemContentWrapperDiv>
        {renderChildrenIgnoreSpecifiedComponents(children, nonDropdownContentComponents)}
      </StyledDropdownItemContentWrapperDiv>
    </StyledDropdownItemWrapperDiv>
  );
};
