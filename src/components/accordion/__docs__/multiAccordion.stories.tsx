import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {greys, palette} from '../../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Icon} from '../../icon/icon';
import {Accordion} from '../accordion';
import {AccordionSection} from '../accordionSection';

/*
 * Constants
 */

const DATA = [{
  id: "project",
  title: "Project",
  tasks: [
    {name: "Task 1", done: true},
    {name: "Task 2", done: false},
    {name: "Task 3", done: false}
  ],
  sections: [{
    id: "subtask",
    title: "Sub Tasks",
    tasks: [
      {name: "Sub Task 1", done: true},
      {name: "Sub Task 2", done: false},
      {name: "Sub Task 3", done: false}
    ]
  }]
},
{id: "bugs",
  title: "Bugs",
  tasks: [
    {name: "Bug 1", done: true},
    {name: "Bug 2", done: false},
    {name: "Bug 3", done: true}
  ]},
{id: "reviews",
  title: "Reviews",
  tasks: [
    {name: "Review 1", done: true},
    {name: "Review 2", done: false}
  ],
  sections: [{
    id: "subtask",
    title: "Sub Tasks",
    tasks: [
      {name: "Sub Task 1", done: true},
      {name: "Sub Task 2", done: false},
      {name: "Sub Task 3", done: false}
    ]
  }]}
];

/*
 * Style.
 */

const StyledShowcaseDiv = styled.div`
  background: ${greys.white};
  border-radius: 8px;
  padding: 16px;
`;

const StyledTaskDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%

  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.normal};
  line-height: 20px;
  padding: 3px 0px;
`;

const StyledIconDiv = styled.div`
  margin: auto;
  position: absolute;
  right: -8px;
`;

export default {
  title: 'Components/Accordion',
  component: Accordion
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = args => (
  <DefaultStyleProvider>
    <StyledShowcaseDiv>
      {renderAccordion(DATA, args)}
    </StyledShowcaseDiv>
  </DefaultStyleProvider>
);

export const Multi = Template.bind({});

/*
 * Helpers
 */

function getSectionDetails(title: string, isOpen: boolean) {
  if (isOpen)
    return `Showing details for ${title}.`;
  return `Hiding details for ${title}.`;
}

function renderAccordion(data, args) {
  return (
    <Accordion {...args}>
      {data.map(section => (
        <AccordionSection
          id={section.id}
          title={section.title}
          onSectionToggled={isOpen => console.log(getSectionDetails(section.title, isOpen))}
        >
          {section.tasks.map(task => (
            <StyledTaskDiv>
              {task.name}
              {task.done && <StyledIconDiv><Icon name="CheckmarkCircle" size={16} color={palette.blue.shade40} /></StyledIconDiv>}
            </StyledTaskDiv>
          ))}
          {section.sections && renderAccordion(section.sections, args)}
        </AccordionSection>
      ))}
    </Accordion>
  );
}
