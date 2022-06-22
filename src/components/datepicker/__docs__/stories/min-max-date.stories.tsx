import {ComponentStory} from '@storybook/react';
import React, {useState} from 'react';
import styled from 'styled-components';

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
          minDate={new Date(Date.now() - 604800000)}
          maxDate={new Date(Date.now() + 604800000)}
          layerRootId="story--components-date-picker--min-max-date"
        />
      </StyledDatePickerWrapperDiv>
    </StyledDatePickerDiv>
  );
};

export const MinMaxDate = Template.bind({});
