/* eslint-disable react/jsx-props-no-spreading */
import _ from 'lodash';
import React, {FC, useMemo, useState} from 'react';
import styled from 'styled-components';

import {renderChildrenSpecifiedComponents} from '../../helpers/renderHelpers';
import {AccordionSection} from './accordionSection';

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
  const accordionSections = useMemo(
    () =>
      _(renderChildrenSpecifiedComponents(children, ['AccordionSection']))
        .compact()
        .value(),
    [children]
  );
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
        if (!React.isValidElement(section)) return null;
        if (!isAccordionSectionElement(section)) return null;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findOpenAccordionSections(accordionSections: any, expandMode: 'single' | 'multi'): Array<string> {
  if (!accordionSections) return [];

  const openAccordionSections = accordionSections
    .filter(
      (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        section: any
      ) => section.props.isOpen
    )
    .map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (section: any) => section.props.id
    );

  // If multiple sections cannot be selected, then only expand the first section
  if (expandMode === 'single') return openAccordionSections.slice(0, 1);

  return openAccordionSections;
}

function isAccordionSectionElement(section: unknown): section is React.ReactElement<{
  id: string;
  onSectionToggled?: (isOpen: boolean) => void;
  children: React.ReactNode;
  title: string;
}> {
  if (!React.isValidElement(section)) return false;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const props = section.props as Record<string, unknown>;
  return typeof props.id === 'string' && typeof props.title === 'string';
}
