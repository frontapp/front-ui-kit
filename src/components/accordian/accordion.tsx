/* eslint-disable react/jsx-props-no-spreading */
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {renderChildrenSpecifiedComponents} from '../../helpers/renderHelpers';
import {AccordionSection} from './accordionSection';

/*
 * Props
 */

interface AccordionProps {
  /** Accordion sections to be rendered. */
  children: React.ReactNode
  /** Flag to determine if multiple sections can be expanded */
  allowMultiSelect?: boolean;
}

/*
 * Style
 */

const StyledAccordionSectionDiv = styled.div`
`;

/*
 * Component
 */

export const Accordion: FC<AccordionProps> = props => {
  const {children, allowMultiSelect = false} = props;
  const accordionSections = renderChildrenSpecifiedComponents(children, ['AccordionSection']);
  const [openAccordionSections, setOpenAccordionSections] = useState(findOpenAccordionSections(accordionSections, allowMultiSelect));

  const toggleSection = (sectionId: string) => {
    const isOpen = openAccordionSections.includes(sectionId);
    if (openAccordionSections.includes(sectionId))
      setOpenAccordionSections(openAccordionSections.filter(id => id !== sectionId));
    else if (allowMultiSelect)
      setOpenAccordionSections([...openAccordionSections, sectionId]);

    else
      setOpenAccordionSections([sectionId]);
    return !isOpen;
  };

  return (
    <StyledAccordionSectionDiv>
      {accordionSections.map(section => {
        if (!section)
          return null;
        const {onSectionToggled} = section.props;
        return (
          <AccordionSection
            {...section.props}
            isOpen={openAccordionSections.includes(section.props.id)}
            onSectionToggled={() => {
              const isOpen = toggleSection(section.props.id);
              if (onSectionToggled)
                onSectionToggled(isOpen);
            }}
          />
        );
      })}
    </StyledAccordionSectionDiv>
  );
};

/*
 * Helpers
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findOpenAccordionSections(accordionSections: any, allowMultiSelect: boolean): Array<string> {
  if (!accordionSections)
    return [];

  const openAccordionSections = accordionSections.filter((
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    section: any) => section.props.isOpen).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (section: any) => section.props.id);
  // If multiple sections cannot be selected, then only expand the first section
  if (!allowMultiSelect)
    return openAccordionSections.slice(0, 1);

  return openAccordionSections;
}
