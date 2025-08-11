import { StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

import { DatePickerDropdown as DatePicker } from '../../datepickerDropdown';

const StyledDatePickerDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  height: 380px;
`;

const StyledDatePickerWrapperDiv = styled.div`
  width: 300px;
`;

const Template = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  return (
    <StyledDatePickerDiv>
      <StyledDatePickerWrapperDiv>
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          type="dateAndTime"
          placeholder="Select a date and time"
          startDate={new Date(2022, 0, 15)}
          layerRootId="story--components-date-picker--start-date"
        />
      </StyledDatePickerWrapperDiv>
    </StyledDatePickerDiv>
  );
};

export const StartDate: StoryObj<typeof DatePicker> = {
  render: () => <Template />,
};
