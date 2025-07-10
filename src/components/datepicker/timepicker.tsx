import {range} from 'lodash';
import {DateTime} from 'luxon';
import React, {FC, RefObject, useEffect, useRef} from 'react';
import styled, {css} from 'styled-components';

import {formatTime} from '../../helpers/calendarHelpers';
import {alphas, greys, palette} from '../../helpers/colorHelpers';
import {fonts, fontSizes, fontWeights} from '../../helpers/fontHelpers';

/*
 * Types.
 */

interface TimePickerProps {
  /** The selected time */
  value?: DateTime;
  /** Handler for when a time is selected */
  onChange: (value: DateTime) => void;
  /** The format to display time in. */
  timeFormat: '12h' | '24h';
}

/*
 * Style.
 */

interface TimePickerItemStyleProps {
  $isSelected?: boolean;
}

const StyledTimePickerDiv = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  border-radius: 8px;

  background-color: ${greys.white};
`;

const StyledItemDiv = styled.div<TimePickerItemStyleProps>`
  height: 30px;
  margin: 4px 0;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: ${fonts.system};
  font-size: ${fontSizes.large};
  font-weight: ${fontWeights.normal};
  line-height: 24px;
  cursor: default;

  ${addTimesStyles}
`;

function addTimesStyles(props: TimePickerItemStyleProps) {
  // Selected state.
  if (props.$isSelected)
    return css`
      color: ${greys.white};
      background-color: ${palette.blue.shade40};
    `;

  return css`
    &:hover {
      background-color: ${alphas.gray10};
    }
    color: ${greys.shade80};
  `;
}

/*
 * Component.
 */

export const TimePicker: FC<TimePickerProps> = (props) => {
  const selectedRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    selectedRef.current?.scrollIntoView({block: 'center'});
  }, []);
  return <StyledTimePickerDiv>{renderItems(props, selectedRef)}</StyledTimePickerDiv>;
};

/*
 * Helpers
 */

function renderItems(props: TimePickerProps, selectedRef: RefObject<HTMLDivElement | null>) {
  // Render each hour in the day.
  const {value = DateTime.now(), onChange, timeFormat} = props;
  return range(24).map((hour) => {
    // Check if this hour is selected.
    const hourTime = value.startOf('hour').set({hour});
    const isSelected = areTimesEqual(hourTime, value);

    return (
      <StyledItemDiv
        key={hour}
        ref={isSelected ? selectedRef : undefined}
        $isSelected={isSelected}
        onClick={() => onChange && onChange(hourTime)}>
        {formatTime(hourTime, timeFormat)}
      </StyledItemDiv>
    );
  });
}

function areTimesEqual(time1: DateTime, time2?: DateTime) {
  return Boolean(time2 && time1.hour === time2.hour && time1.minute === time2.minute);
}
