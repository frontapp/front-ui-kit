import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {greys} from '../../../../helpers/colorHelpers';
import {VisualSizesEnum} from '../../../../helpers/fontHelpers';
import {DefaultStyleProvider} from '../../../../utils/defaultStyleProvider';
import {Checkbox} from '../../../checkbox/checkbox';
import {Heading} from '../../../heading/heading';
import {Accordion} from '../../accordion';
import {AccordionSection} from '../../accordionSection';

/*
 * Constants
 */

const DATA = [
  {
    id: "task",
    title: "Task",
    tasks: [
      {id: 'task-1', name: "Project"},
      {id: 'task-2', name: "Type"},
      {id: 'task-3', name: "Summary"},
      {id: 'task-4', name: "Components"},
      {id: 'task-5', name: "Description"},
      {id: 'task-6', name: "Attachments"},
      {id: 'task-7', name: "Assignee"},
      {id: 'task-8', name: "Priority"}
    ]
  },
  {
    id: "bug",
    title: "Bug",
    tasks: [
      {id: 'bug-1', name: "Project"},
      {id: 'bug-2', name: "Type"},
      {id: 'bug-3', name: "Summary"},
      {id: 'bug-4', name: "Components"},
      {id: 'bug-5', name: "Description"}
    ]
  }
];

const CHECKED_STATE = {
  'task-1': true,
  'task-2': true,
  'task-3': true,
  'task-4': false,
  'task-5': true,
  'task-6': true,
  'task-7': false,
  'task-8': false,
  'bug-1': false,
  'bug-2': false,
  'bug-3': true,
  'bug-4': false,
  'bug-5': true
};

/*
 * Style.
 */

const StyledShowcaseDiv = styled.div`
  display: flex;
  flex-flow: column;
  gap: 8px;
  background: ${greys.white};
  border-radius: 8px;
  padding: 16px;
  max-width: 400px;
  border: 1px solid ${greys.shade20};
`;

const StyledTaskDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 3px 0px;
`;

const StyledTaskNameDiv = styled.div`
  flex: 1;
`;

const StyledCheckboxDiv = styled.div`
  margin: auto;
`;

const Template: ComponentStory<typeof Accordion> = () => {
  const [checkedState, setCheckedState] = useState(CHECKED_STATE);
  return (
    <DefaultStyleProvider>
      <StyledShowcaseDiv>
        <Heading size={VisualSizesEnum.SMALL} color={greys.shade70}>Show/Hide Fields</Heading>
        <Accordion>
          {DATA.map(section => (
            <AccordionSection
              key={section.id}
              id={section.id}
              title={section.title}
              onSectionToggled={isOpen => console.log(getSectionDetails(section.title, isOpen))}
            >
              {section.tasks.map(task => (
                <StyledTaskDiv key={task.name}>
                  <StyledTaskNameDiv
                    onClick={() => setCheckedState(state => ({...state, [task.id]: !state[task.id]}))}
                  >
                    {task.name}
                  </StyledTaskNameDiv>
                  <StyledCheckboxDiv>
                    <Checkbox
                      isChecked={checkedState[task.id]}
                      onChange={isChecked => setCheckedState(state => ({...state, [task.id]: isChecked}))}
                    />
                  </StyledCheckboxDiv>
                </StyledTaskDiv>
              ))}
            </AccordionSection>
          ))}
        </Accordion>
      </StyledShowcaseDiv>
    </DefaultStyleProvider>
  );
};

export const Basic = Template.bind({});

/*
 * Helpers
 */

function getSectionDetails(title: string, isOpen: boolean) {
  if (isOpen)
    return `Showing details for ${title}.`;
  return `Hiding details for ${title}.`;
}
