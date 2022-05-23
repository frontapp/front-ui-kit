import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FC, useState} from 'react';
import styled from 'styled-components';

import {CalendarWeekDaysEnum} from '../../../helpers/calendarHelpers';
import {greys} from '../../../helpers/colorHelpers';
import {fontSizes} from '../../../helpers/fontHelpers';
import {DatePicker} from '../datepicker';

/*
 * Style.
 */

const StyledShowcaseDiv = styled.div`
  background: ${greys.shade50};
  border-radius: 8px;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledDescriptionDiv = styled.div`
  font-size: ${fontSizes.medium};
  color: ${greys.black};
  text-align: center;
  padding: 10px 0px
`;

/*
 * Component.
 */

const ShowcaseDatePickerComponent: FC = props => {
  const onChange = newDate => {
    setDescription(newDate.toDateString());
  };
  const date = new Date();
  const [description, setDescription] = useState(date.toDateString());
  const minDate = new Date('05/01/2022');
  const maxDate = new Date('05/31/2022');

  return (
    <StyledShowcaseDiv>
      {description && <StyledDescriptionDiv>{description}</StyledDescriptionDiv>}
      <DatePicker value={date} minDate={minDate} maxDate={maxDate} calendarWeekStartDay={CalendarWeekDaysEnum.FRIDAY} onChange={onChange} />
    </StyledShowcaseDiv>
  );
};

/*
 * Storybook.
 */

export default {
  title: 'Development/DatePicker',
  component: DatePicker
} as ComponentMeta<typeof DatePicker>;

const ShowcaseTemplate: ComponentStory<typeof ShowcaseDatePickerComponent> = props => <ShowcaseDatePickerComponent {...props} />;
export const Showcase = ShowcaseTemplate.bind({});
Showcase.parameters = {
  controls: {hideNoControlsWarning: true}
};
