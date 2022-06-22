import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

import {CalendarWeekDaysEnum} from '../../../../helpers/calendarHelpers';
import {DatePickerDropdown} from '../../datepickerDropdown';

const StyledDatePickerDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 380px;
`;

const StyledDatePickerWrapperDiv = styled.div`
  width: 300px;
`;

const Template: ComponentStory<typeof DatePickerDropdown> = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  return (
    <StyledDatePickerDiv>
      <StyledDatePickerWrapperDiv>
        <DatePickerDropdown
          value={selectedDate}
          onChange={setSelectedDate}
          type="dateAndTime"
          placeholder="Select a date and time"
          calendarWeekStartDay={CalendarWeekDaysEnum.TUESDAY}
          layerRootId="story--components-date-picker--start-date"
        />
      </StyledDatePickerWrapperDiv>
    </StyledDatePickerDiv>
  );
};

export const StartDate = Template.bind({});
