import React, { FC } from 'react';
import styled from 'styled-components';

import { Icon } from '../../elements/icon/icon';
import { greys } from '../../helpers/colorHelpers';
import { fonts, fontSizes, fontWeights } from '../../helpers/fontHelpers';

/*
 * Props
 */
interface AccordionSectionProps {
  /** Contents of the section to be rendered. */
  children: React.ReactNode;
  /** The unique id of the section. */
  id: string;
  /** The title to render for the accordion section. */
  title: string;
  /** Controls whether the section is expanded or not. */
  isOpen?: boolean;
  /** Called when the section is opened/closed. */
  onSectionToggled?: (isOpen: boolean) => void;
}

/*
 * Styles
 */

const StyledAccordionSectionDiv = styled.div`
  display: flex;
  flex-direction: column;

  cursor: default;
  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.normal};
  line-height: 20px;
  color: ${greys.shade80};
`;

const StyledAccordionSectionContainerDiv = styled.div`
  display: flex;
  flex-flow: row;
  border: 2px solid transparent;
  border-radius: 4px;
  &:hover {
    background-color: ${greys.shade20};
  }
  padding: 3px 0px;
`;

const StyledAccordionSectionTitleDiv = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
`;

const StyledAccordionSectionContentDiv = styled.div`
  padding-left: 35px;
`;

const StyledChevronIconDiv = styled.div`
  margin-bottom: 4px;
  margin-left: 4px;
`;

/*
 * Component
 */

export const AccordionSection: FC<AccordionSectionProps> = (props) => {
  const { children, isOpen = false, title, id, onSectionToggled } = props;

  return (
    <StyledAccordionSectionDiv id={id}>
      <StyledAccordionSectionContainerDiv>
        <StyledAccordionSectionTitleDiv onClick={() => onSectionToggled && onSectionToggled(isOpen)}>
          <StyledChevronIconDiv>
            <Icon name={isOpen ? 'ChevronDown' : 'ChevronRight'} size={12} />
          </StyledChevronIconDiv>
          {title}
        </StyledAccordionSectionTitleDiv>
      </StyledAccordionSectionContainerDiv>
      {maybeRenderAccordionSectionContent(children, isOpen)}
    </StyledAccordionSectionDiv>
  );
};

AccordionSection.displayName = 'AccordionSection';

/*
 * Helpers
 */

function maybeRenderAccordionSectionContent(children: React.ReactNode, isOpen?: boolean) {
  if (!isOpen) return null;
  return <StyledAccordionSectionContentDiv>{children}</StyledAccordionSectionContentDiv>;
}
