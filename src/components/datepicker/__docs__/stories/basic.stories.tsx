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
  const [selectedDate, setSelectedDate] = useState<Date>();
  return (
    <StyledDatePickerDiv>
      <StyledDatePickerWrapperDiv>
        <DatePickerDropdown
          value={selectedDate}
          onChange={setSelectedDate}
          type="dateAndTime"
          placeholder="Select a date and time"
          layerRootId="story--components-date-picker--basic"
        />
      </StyledDatePickerWrapperDiv>
    </StyledDatePickerDiv>
  );
};

export const Basic = Template.bind({});
