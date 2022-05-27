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
  /** Accordion sections to be rendered. */
  children: React.ReactNode
  /** Flag to determine if multiple sections can be expanded */
  shouldAllowMultiSelect?: boolean;
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

export const Accordion: FC<AccordionProps> = props => {
  const {children, shouldAllowMultiSelect = false} = props;
  const accordionSections = useMemo(() => _(
    renderChildrenSpecifiedComponents(children, ['AccordionSection'])
  ).compact().value(), [children]);
  const [openAccordionSections, setOpenAccordionSections] = useState(findOpenAccordionSections(accordionSections, shouldAllowMultiSelect));

  const toggleSection = (sectionId: string) => {
    const isOpen = openAccordionSections.includes(sectionId);
    if (isOpen)
      setOpenAccordionSections(openAccordionSections.filter(id => id !== sectionId));
    else if (shouldAllowMultiSelect)
      setOpenAccordionSections([...openAccordionSections, sectionId]);
    else
      setOpenAccordionSections([sectionId]);
    return !isOpen;
  };

  return (
    <StyledAccordionSectionDiv>
      {accordionSections.map(section => {
        const {id, onSectionToggled} = section.props;
        return (
          <AccordionSection
            {...section.props}
            isOpen={openAccordionSections.includes(id)}
            onSectionToggled={() => {
              const isOpen = toggleSection(id);
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
function findOpenAccordionSections(accordionSections: any, shouldAllowMultiSelect: boolean): Array<string> {
  if (!accordionSections)
    return [];

  const openAccordionSections = accordionSections.filter((
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    section: any) => section.props.isOpen).map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (section: any) => section.props.id);

  // If multiple sections cannot be selected, then only expand the first section
  if (!shouldAllowMultiSelect)
    return openAccordionSections.slice(0, 1);

  return openAccordionSections;
}
