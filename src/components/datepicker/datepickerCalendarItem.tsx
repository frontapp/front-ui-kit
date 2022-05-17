import {DateTime} from 'luxon';
import React, {FC} from 'react';
import styled, {css} from 'styled-components';
import { greys, palette, alphas } from '../../helpers/colorHelpers';
import { fontSizes, fontWeights } from '../../helpers/fontHelpers';

/*
 * Props.
 */

interface DatePickerCalendarItemProps {
  day: DateTime;
  isDifferentMonth: boolean;
  isSelectable: boolean;
  isSelected: boolean;
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
  padding: 4px 0;
  border-radius: 6px;
  position: relative;
  text-align: center;
  font-size: ${fontSizes.small};
  line-height: 16px;
  ${addNormalDayStyle};
  ${maybeAddHoverDayStyle};
`;

function addNormalDayStyle(props: DayStyleProps) {
  // Selected state.
  if (props.$isSelected)
    return css`
      color: ${greys.white};
      font-weight: ${fontWeights.medium};
      background-color: ${palette.blue.shade40};
    `;

  // Greyed-out state.
  if (!props.$isSelectable || props.$isDifferentMonth)
    return css`
      color: ${greys.shade50};
    `;

  // Normal state.
  return css`
    color: ${greys.shade90};
  `;
}

function maybeAddHoverDayStyle(props: DayStyleProps) {
  // Greyed-out state.
  if (!props.$isSelectable)
    return '';

  // Selected state.
  if (props.$isSelected)
    return css`
      &:hover {
        background-color: ${palette.blue.shade50};
      }
    `;

  // Normal state.
  return css`
    &:hover {
      color: ${greys.shade90};
      background-color: ${alphas.gray20};
    }
  `;
}

/*
 * Component.
 */

export const DatePickerCalendarItem: FC<DatePickerCalendarItemProps> = props => {
  const {day, isSelectable} = props;
  return (
    <StyledDayDiv
    $isSelected={props.isSelected}
    $isSelectable={props.isSelectable}
    $isDisabled={!isSelectable}
    $isDifferentMonth={props.isDifferentMonth}
  >
    {day.day}
  </StyledDayDiv>
  );
};