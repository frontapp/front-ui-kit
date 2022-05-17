import React, {FC, MouseEventHandler} from 'react';
import styled from 'styled-components';
import {DateTime} from 'luxon';

import {greys} from '../../helpers/colorHelpers';
import {Button} from '../button/button';
import { Icon } from '../icon/icon';
import { fonts } from '../..';
import { fontSizes, fontWeights } from '../../helpers/fontHelpers';

/*
 * Props.
 */

interface DatePickerHeaderProps {
  focusedMonth: DateTime;
  onFocusPreviousMonth: MouseEventHandler;
  onFocusNextMonth: MouseEventHandler;
}

/*
 * Style.
 */

const StyledCalendarHeader = styled.header`
  width: inherit;
  display: grid;
  grid-auto-columns: auto;
  grid-template-rows: auto;
  justify-content: center;
  justify-items: center;
  align-items: center;
  background: ${greys.white};
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
  const {focusedMonth, onFocusPreviousMonth, onFocusNextMonth} = props;
  return (
    <StyledCalendarHeader>
      <Button type="icon" onClick={onFocusPreviousMonth}><Icon name="ChevronLeft" /></Button>
      {renderFocusedMonth(focusedMonth)}
      <Button type="icon" onClick={onFocusNextMonth}><Icon name="ChevronRight" /></Button>
    </StyledCalendarHeader>
  );
};

/*
* Helpers
*/

/** Render the selected month. */
function renderFocusedMonth(focusedMonth: DateTime) {
  return (
    <StyledTitleDiv data-testid="focusedMonth">
      {renderMonth(focusedMonth)}
    </StyledTitleDiv>
  );
}

/** Localization-aware renderer for a single month. */
function renderMonth(month: DateTime) {
  return `${month.monthLong} ${month.year}`;
}





