import {ComponentMeta, ComponentStory} from '@storybook/react';
import {noop} from 'lodash';
import React from 'react';
import styled from 'styled-components';

import {DefaultStyleProvider} from '../../../utils/defaultStyleProvider';
import {Checkbox} from '../../checkbox/checkbox';
import {Accordion} from '../accordion';
import {AccordionSection} from '../accordionSection';

/*
 * Style.
 */

const StyledCheckboxesDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default {
  title: 'Components/Accordion',
  component: Accordion
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = args => (
  <DefaultStyleProvider>
    <Accordion {...args}>
      <AccordionSection id="Project 1 " title="Project 1" isOpen onSectionToggled={isOpen => { console.log(isOpen); }}>
        <StyledCheckboxesDiv>
          <Checkbox isChecked={false} onChange={noop}>Task 1</Checkbox>
          <Checkbox isChecked onChange={noop}>Task 2</Checkbox>
          <Checkbox isChecked={false} onChange={noop}>Task 3</Checkbox>
        </StyledCheckboxesDiv>
      </AccordionSection>
      <AccordionSection id="Project 2" title="Project 2" isOpen onSectionToggled={isOpen => { console.log(isOpen); }}>
        <StyledCheckboxesDiv>
          <Checkbox isChecked={false} onChange={noop}>Task 4</Checkbox>
          <Checkbox isChecked onChange={noop}>Task 5</Checkbox>
          <Checkbox isChecked={false} onChange={noop}>Task 6</Checkbox>
        </StyledCheckboxesDiv>
      </AccordionSection>
    </Accordion>
  </DefaultStyleProvider>
);

export const Basic = Template.bind({});
