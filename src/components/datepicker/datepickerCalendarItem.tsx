import { DateTime } from 'luxon';
import { FC, MouseEventHandler } from 'react';
import styled, { css } from 'styled-components';

import { greys, palette } from '../../helpers/colorHelpers';
import { fonts, fontSizes, fontWeights } from '../../helpers/fontHelpers';

/*
 * Props.
 */

interface DatePickerCalendarItemProps {
  day: DateTime;
  isDifferentMonth: boolean;
  isSelectable: boolean;
  isSelected: boolean;
  /** The handler for when a date is selected */
  onSelect?: (date: DateTime) => void;
}

/*
 * Style.
 */

interface DayStyleProps {
  $isSelected: boolean;
  $isSelectable: boolean;
  $isDifferentMonth: boolean;
  $isDisabled: boolean;
}

const StyledDayDiv = styled.div<DayStyleProps>`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  text-align: center;
  ${addDayStyles};

  font-family: ${fonts.system};
  font-size: ${fontSizes.small};
  font-weight: ${fontWeights.normal};
  line-height: 24px;
  cursor: default;
`;

function addDayStyles(props: DayStyleProps) {
  // Selected state.
  if (props.$isSelected)
    return css`
      color: ${greys.white};
      background-color: ${palette.blue.shade40};
      &:hover {
        background-color: ${palette.blue.shade50};
      }
    `;

  // Greyed-out state.
  if (!props.$isSelectable || props.$isDifferentMonth)
    return css`
      color: ${greys.shade50};
      &:hover {
        background-color: ${greys.shade20};
      }
    `;

  // Normal state.
  return css`
    color: ${greys.shade80};
    &:hover {
      color: ${greys.shade90};
      background-color: ${greys.shade20};
    }
  `;
}

/*
 * Component.
 */

export const DatePickerCalendarItem: FC<DatePickerCalendarItemProps> = (props) => {
  const { day, isSelectable, isSelected, isDifferentMonth, onSelect } = props;
  const onClick: MouseEventHandler = (event) => {
    event.preventDefault();
    if (onSelect) onSelect(day);
  };
  return (
    <StyledDayDiv
      $isSelected={isSelected}
      $isSelectable={isSelectable}
      $isDisabled={!isSelectable}
      $isDifferentMonth={isDifferentMonth}
      onClick={onClick}>
      {day.day}
    </StyledDayDiv>
  );
};
