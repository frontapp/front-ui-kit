import {DateTime} from 'luxon';
import React, {FC, MouseEventHandler} from 'react';
import styled from 'styled-components';

import {fonts} from '../..';
import {greys} from '../../helpers/colorHelpers';
import {fontSizes, fontWeights} from '../../helpers/fontHelpers';
import {Button} from '../button/button';
import {Icon} from '../icon/icon';

/*
 * Props.
 */

interface DatePickerHeaderProps {
  value: DateTime;
  onFocusPreviousMonth: MouseEventHandler;
  onFocusNextMonth: MouseEventHandler;
}

/*
 * Style.
 */

const StyledCalendarHeader = styled.header`
  width: inherit;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  background: ${greys.white};
  padding: 4px 0px;
`;

const StyledTitleDiv = styled.div`
  font-family: ${fonts.system};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeights.normal};
  line-height: 16px;
  grid-column: 2;
  grid-row: 1;
  margin: 0 5px;
  color: ${greys.shade70};
  text-transform: capitalize;
`;

/*
 * Component.
 */

export const DatePickerHeader: FC<DatePickerHeaderProps> = props => {
  const {value, onFocusPreviousMonth, onFocusNextMonth} = props;
  return (
    <StyledCalendarHeader>
      <Button type="icon" onClick={onFocusPreviousMonth}><Icon name="ChevronLeft" /></Button>
      {renderFocusedMonth(value)}
      <Button type="icon" onClick={onFocusNextMonth}><Icon name="ChevronRight" /></Button>
    </StyledCalendarHeader>
  );
};

/*
* Helpers
*/

/** Render the selected month. */
function renderFocusedMonth(value: DateTime) {
  return (
    <StyledTitleDiv data-testid="value">
      {renderMonth(value)}
    </StyledTitleDiv>
  );
}

/** Localization-aware renderer for a single month. */
function renderMonth(month: DateTime) {
  return `${month.monthLong} ${month.year}`;
}
