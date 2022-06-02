import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import {greys, palette} from '../../../helpers/colorHelpers';
import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Icon} from '../../icon/icon';
import {Accordion} from '../accordion';
import {AccordionSection} from '../accordionSection';

/*
 * Constants
 */

const DATA = [{
  id: "fiction",
  title: "Fiction",
  books: [
    {name: "The Hunger Games", read: true},
    {name: "The Chronicles of Narnia", read: true},
  ],
  sections: [{
    id: "fantasy",
    title: "Fantasy",
    books: [
      {name: "Harry Potter", read: true},
      {name: "Lord of the Rings", read: true},
      {name: "Game of Thrones", read: false}
    ]
  }]
},
{id: "History",
  title: "History",
  books: [
    {name: "Lies My Teacher Told Me", read: true},
    {name: "A Short History of Nearly Everything", read: true}
  ],
  sections: [{
    id: "historical-fiction",
    title: "Historical Fiction",
    books: [
      {name: "The Richest Man in Babylon", read: false},
      {name: "The Buddha in the Attic", read: true},
      {name: "Pachinko", read: true}
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
  padding: 3px 0px;
`;

const StyledIconDiv = styled.div`
  margin: auto;
  position: absolute;
  right: 0px;
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
          {section.books.map(book => (
            <StyledTaskDiv>
              {book.name}
              {book.read && <StyledIconDiv><Icon name="CheckmarkCircle" size={16} color={palette.blue.shade40} /></StyledIconDiv>}
            </StyledTaskDiv>
          ))}
          {section.sections && renderAccordion(section.sections, args)}
        </AccordionSection>
      ))}
    </Accordion>
  );
}
