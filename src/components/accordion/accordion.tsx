/* eslint-disable react/jsx-props-no-spreading */
import _ from 'lodash';
import React, {FC, useMemo, useState} from 'react';
import styled from 'styled-components';

import {renderChildrenSpecifiedComponents} from '../../helpers/renderHelpers';
import {AccordionSection} from './accordionSection';

/*
 * Types
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

type AccordionSectionElement = React.ReactElement<AccordionSectionProps>;

/*
 * Props
 */

interface AccordionProps {
  /** Accordion sections to be rendered. Only supports rendering AccordionSection components. */
  children: React.ReactNode;
  /** Option to determine if only a single or multiple sections can be expanded. */
  expandMode?: 'single' | 'multi';
}

/*
 * Style
 */

const StyledAccordionSectionDiv = styled.div`
  display: block;
`;

/*
 * Component
 */

export const Accordion: FC<AccordionProps> = ({children, expandMode = 'single'}) => {
  const accordionSections = useMemo(() => {
    const filteredSections = _(renderChildrenSpecifiedComponents(children, ['AccordionSection']))
      .compact()
      .value();

    // Type guard to ensure we have the correct type
    if (Array.isArray(filteredSections))
      return filteredSections.filter(
        (section): section is AccordionSectionElement =>
          React.isValidElement(section) && section.type === AccordionSection
      );
    return [];
  }, [children]);
  const [openAccordionSections, setOpenAccordionSections] = useState(
    findOpenAccordionSections(accordionSections, expandMode)
  );

  const toggleSection = (sectionId: string) => {
    const isOpen = openAccordionSections.includes(sectionId);
    if (isOpen) setOpenAccordionSections(openAccordionSections.filter((id) => id !== sectionId));
    else if (expandMode === 'multi') setOpenAccordionSections([...openAccordionSections, sectionId]);
    else setOpenAccordionSections([sectionId]);
    return !isOpen;
  };

  return (
    <StyledAccordionSectionDiv>
      {accordionSections.map((section) => {
        const {id, onSectionToggled, children: sectionChildren, title} = section.props;
        return (
          <AccordionSection
            key={id}
            id={id}
            title={title}
            isOpen={openAccordionSections.includes(id)}
            onSectionToggled={() => {
              const isOpen = toggleSection(id);
              if (onSectionToggled) onSectionToggled(isOpen);
            }}>
            {sectionChildren}
          </AccordionSection>
        );
      })}
    </StyledAccordionSectionDiv>
  );
};

/*
 * Helpers
 */

function findOpenAccordionSections(
  accordionSections: AccordionSectionElement[],
  expandMode: 'single' | 'multi'
): Array<string> {
  if (!accordionSections) return [];

  const openAccordionSections = accordionSections
    .filter((section) => section.props.isOpen)
    .map((section) => section.props.id);

  // If multiple sections cannot be selected, then only expand the first section
  if (expandMode === 'single') return openAccordionSections.slice(0, 1);

  return openAccordionSections;
}
