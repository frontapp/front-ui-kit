import React, {FC} from 'react';
import styled from 'styled-components';

import {greys} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {Icon} from '../icon/icon';

/*
 * Props
 */
interface AccordianSectionProps {
  /** Accordion sections to be rendered */
  children: React.ReactNode
  /** The unique id of the section */
  id: string;
  /** The title to render for the accordion section */
  title: string;
  /** Passed from the parent accordion. Any value set here from the user will be used as the default value */
  isOpen?: boolean;
  /** Called when the section is opened/closed. */
  onSectionToggled?: (isOpen: boolean) => void;
  /** Render actions on the right had side of the title */
  renderActions?: () => void
}

/*
 * Styles
 */

const StyledAccordionSectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  cursor: default;
`;

const StyledAccordionSectionContainerDiv = styled.div`
  display: flex;
  flex-flow: row;
  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.normal};
  line-height: 20px;
  padding: 3px 0px;
  

  border: 2px solid transparent;
  border-radius: 4px;
  &:hover {
    background-color: ${greys.shade20};
  }
`;

const StyledAccordionSectionTitleDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  color: ${greys.shade80};
`;

const StyledAccordionSectionContentDiv = styled.div`
  color: ${greys.shade80};
  padding-left: 35px;
`;

const StyledChevronIconDiv = styled.div`
  margin-bottom: 4px;
`;

/*
 * Component
 */

export const AccordionSection: FC<AccordianSectionProps> = props => {
  const {children, isOpen = false, title, id, onSectionToggled} = props;

  return (
    <StyledAccordionSectionDiv id={id}>
      <StyledAccordionSectionContainerDiv>
        <StyledAccordionSectionTitleDiv onClick={() => onSectionToggled && onSectionToggled(isOpen)}>
          <StyledChevronIconDiv>
            <Icon name={isOpen? "ChevronDown" : "ChevronRight"} size={12} />
          </StyledChevronIconDiv>
          {title}
        </StyledAccordionSectionTitleDiv>
      </StyledAccordionSectionContainerDiv>
      {maybeRenderAccordionSectionContent(children, isOpen)}
    </StyledAccordionSectionDiv>
  );
};

/*
 * Helpers
 */

function maybeRenderAccordionSectionContent(children: React.ReactNode, isOpen?: boolean) {
  if (!isOpen)
    return null;
  return (
    <StyledAccordionSectionContentDiv>
      {children}
    </StyledAccordionSectionContentDiv>
  );
}
